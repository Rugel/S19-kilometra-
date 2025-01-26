import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "S19 - Kock - odczyt kilometrażu",
  description: "Odczyt kilometrażu na budowie S19 - Obwodnica Kocka i Woli Skromowskiej za pomocą smartfona z modułem GPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
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
