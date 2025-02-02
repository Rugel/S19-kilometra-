import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Informacja o cookies",
    description: "Strona przedstawia informacje na temat plików cookies używanych na stronie internetowej",
    keywords: "cookies, ciasteczka, polityka, prywatność"
};

export default function Cookies_info({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}