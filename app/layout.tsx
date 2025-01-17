import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "S19 - Kock - odczyt kilometrażu",
  description: "Odczyt kilometrażu na budowie S19 - Obwodnica Kocka i Woli Skromowskiej",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
      <meta name="apple-mobile-web-app-title" content="S19 - kilometraż" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
