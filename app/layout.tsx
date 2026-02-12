import type { Metadata } from "next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "S19 Kilometraż",
  "operatingSystem": "Any",
  "applicationCategory": "Utility",
  "description": "Narzędzie do odczytu kilometrażu na budowie drogi ekspresowej S19 za pomocą GPS.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PLN"
  }
};

export const metadata: Metadata = {
  title: {
    template: "%s | S19 Kilometraż",
    default: "S19 Kock — kilometraż na budowie obwodnicy Kocka i Woli Skromowskiej",
  },
  description: "Odczyt kilometrażu na budowie S19 — Obwodnica Kocka i Woli Skromowskiej za pomocą smartfona z modułem GPS. Plan budowy na mapie.",
  metadataBase: new URL('https://s19-kock.vercel.app'),
  openGraph: {
    title: "S19 Kilometraż - GPS na budowie",
    description: "Sprawdź swój kilometraż na budowie S19. Precyzyjna mapa i odczyt GPS.",
    url: 'https://s19-kock.vercel.app',
    siteName: 'S19 Kilometraż',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S19 Kilometraż',
    description: 'Odczyt kilometrażu na budowie S19 za pomocą GPS.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-V5XJZG59LS`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V5XJZG59LS', {
                page_path: window.location.pathname,
              });
            `,
          }}
        ></script>
        <meta name="apple-mobile-web-app-title" content="S19 - kilometraż" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
