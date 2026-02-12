import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Radzyń Podlaski - Kock — kilometraż S19",
    description: "Odczyt kilometrażu na budowie S19 odcinek Radzyń Podlaski — Kock. Sprawdź swoją lokalizację na mapie pikietażu.",
};

export default function RadzynKockLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
