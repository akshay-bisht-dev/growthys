import { Inter, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/components.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/layout/JsonLd";
import site, { absoluteUrl } from "@/data/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Growthys — Web Development & Digital Growth Agency",
    template: "%s | Growthys",
  },
  description: site.description,
  applicationName: "Growthys",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Growthys",
    title: "Growthys — Web Development & Digital Growth Agency",
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growthys — Web Development & Digital Growth Agency",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
};

// Runs before paint: opt into entrance animations only when motion is allowed,
// so content is never hidden for reduced-motion users or when JS fails.
const motionScript = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: absoluteUrl("/logos/growthys-mark.svg"),
            description: site.description,
            ...(site.contact.email && { email: site.contact.email }),
            ...(site.social.length && { sameAs: site.social.map((s) => s.href) }),
          }}
        />
      </body>
    </html>
  );
}
