import type { Metadata } from "next";

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