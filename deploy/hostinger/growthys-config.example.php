<?php
// Copy to growthys-config.php ONE LEVEL ABOVE public_html, e.g.
//   /home/<user>/domains/growthys.com/growthys-config.php
// It is read by public_html/api/contact.php and must never be web-accessible.
return [
    // Where enquiries are delivered (comma-separate several addresses).
    'mail_to' => 'hello@growthys.com',

    // Sender. With PHP mail() this must be a real mailbox on growthys.com
    // created in hPanel → Emails. With Resend it must be on a verified domain.
    'mail_from' => 'website@growthys.com',

    // Optional: Resend API key for more reliable delivery. Leave empty to use
    // Hostinger's PHP mail().
    'resend_api_key' => '',
];
