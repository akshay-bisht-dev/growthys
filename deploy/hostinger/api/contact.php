<?php
/**
 * Growthys contact form endpoint (Hostinger shared hosting, PHP 8).
 *
 * Mirrors src/lib/contact.js: validation, honeypot, minimum fill time and a
 * per-IP rate limit. Credentials live OUTSIDE public_html in
 * growthys-config.php (see deploy/growthys-config.example.php).
 *
 * Delivery: Resend API when `resend_api_key` is set, otherwise PHP mail()
 * through Hostinger's mail server (`mail_from` must be a mailbox on the
 * domain). Success is only reported when the message was accepted.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// ---------------------------------------------------------------- config
$configFile = dirname(__DIR__, 2) . '/growthys-config.php';
$config = is_file($configFile) ? (array) require $configFile : [];
$mailTo = trim((string) ($config['mail_to'] ?? ''));
$mailFrom = trim((string) ($config['mail_from'] ?? ''));
$resendKey = trim((string) ($config['resend_api_key'] ?? ''));

// ---------------------------------------------------------------- rate limit
// 5 submissions per IP per 10 minutes, stored as small files in the temp dir.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rlDir = sys_get_temp_dir() . '/growthys-rl';
if (!is_dir($rlDir)) {
    @mkdir($rlDir, 0700, true);
}
$rlFile = $rlDir . '/' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_file($rlFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rlFile))),
        fn ($t) => $now - $t < 600
    );
}
$hits[] = $now;
@file_put_contents($rlFile, implode(',', $hits), LOCK_EX);
if (count($hits) > 5) {
    respond(429, ['ok' => false, 'error' => 'Too many submissions. Please try again in a few minutes.']);
}

// ---------------------------------------------------------------- input
$raw = file_get_contents('php://input', false, null, 0, 20000);
$body = json_decode((string) $raw, true);
if (!is_array($body)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// Spam checks: hidden honeypot field, and forms submitted implausibly fast.
$startedAt = (float) ($body['startedAt'] ?? 0);
$elapsedMs = $now * 1000 - $startedAt;
if (!empty($body['website']) || $startedAt <= 0 || $elapsedMs < 3000) {
    respond(400, ['ok' => false, 'error' => 'Your submission could not be verified. Please try again.']);
}

$str = fn (string $k): string => trim((string) ($body[$k] ?? ''));
$v = [
    'name' => $str('name'),
    'email' => $str('email'),
    'phone' => $str('phone'),
    'company' => $str('company'),
    'service' => $str('service'),
    'budget' => $str('budget'),
    'message' => $str('message'),
];
$consent = ($body['consent'] ?? false) === true;
$len = fn (string $s): int => mb_strlen($s);

$errors = [];
if ($len($v['name']) < 2 || $len($v['name']) > 100) $errors['name'] = 'Please enter your full name.';
if (!filter_var($v['email'], FILTER_VALIDATE_EMAIL) || $len($v['email']) > 200) $errors['email'] = 'Please enter a valid email address.';
if ($v['phone'] !== '' && !preg_match('/^[+()\-.\s\d]{6,30}$/', $v['phone'])) $errors['phone'] = 'Please enter a valid phone number, or leave it blank.';
if ($len($v['company']) > 120) $errors['company'] = 'Company name is too long.';
if ($v['service'] === '' || $len($v['service']) > 120) $errors['service'] = 'Please choose the service you need.';
if ($len($v['budget']) > 40) $errors['budget'] = 'Please choose a budget range.';
if ($len($v['message']) < 20) $errors['message'] = 'Please tell us a little more (at least 20 characters).';
if ($len($v['message']) > 5000) $errors['message'] = 'Please keep your message under 5,000 characters.';
if (!$consent) $errors['consent'] = 'Please confirm we may use these details to reply to you.';
if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

if ($mailTo === '' || ($resendKey === '' && $mailFrom === '') || ($resendKey !== '' && $mailFrom === '')) {
    error_log('[growthys contact] Delivery not configured: create growthys-config.php outside public_html.');
    respond(503, ['ok' => false, 'error' => 'Our contact form is temporarily unavailable. Please try again later.']);
}

// ---------------------------------------------------------------- message
// Strip CR/LF from anything that could reach a mail header.
$clean = fn (string $s): string => str_replace(["\r", "\n"], ' ', $s);
$rows = [
    'Name' => $v['name'],
    'Email' => $v['email'],
    'Phone' => $v['phone'] ?: '—',
    'Company' => $v['company'] ?: '—',
    'Service' => $v['service'],
    'Budget' => $v['budget'] ?: '—',
];
$text = '';
foreach ($rows as $k => $val) {
    $text .= "$k: $val\n";
}
$text .= "\n" . $v['message'] . "\n";
$subject = $clean('New enquiry: ' . $v['service'] . ' — ' . $v['name']);

$sent = false;
if ($resendKey !== '') {
    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $resendKey, 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode([
            'from' => $mailFrom,
            'to' => array_map('trim', explode(',', $mailTo)),
            'reply_to' => $clean($v['email']),
            'subject' => $subject,
            'text' => $text,
        ]),
    ]);
    $result = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $sent = $status >= 200 && $status < 300;
    if (!$sent) error_log('[growthys contact] Resend error ' . $status . ' ' . substr((string) $result, 0, 300));
} else {
    $headers = [
        'From: Growthys Website <' . $clean($mailFrom) . '>',
        'Reply-To: ' . $clean($v['email']),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $sent = mail($mailTo, $encodedSubject, $text, implode("\r\n", $headers), '-f' . $clean($mailFrom));
    if (!$sent) error_log('[growthys contact] mail() returned false');
}

if (!$sent) {
    respond(502, ['ok' => false, 'error' => "We couldn't send your message. Please try again shortly."]);
}
respond(200, ['ok' => true]);
