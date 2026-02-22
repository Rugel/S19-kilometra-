import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Radzyń Podlaski - Kock — kilometraż S19",
    description: "Odczyt kilometrażu na budowie S19 odcinek Radzyń Podlaski — Kock. Sprawdź swoją lokalizację na mapie pikietażu.",
    openGraph: {
        title: "S19 Radzyń Podlaski - Kock - GPS na budowie",
        description: "Odczyt kilometrażu na budowie S19 odcinek Radzyń Podlaski — Kock. Sprawdź swoją lokalizację na mapie.",
        url: 'https://s19-kock.vercel.app/radzyn-kock',
        siteName: 'S19 Kilometraż',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'S19 Radzyń Podlaski - Kock',
        description: 'Odczyt kilometrażu na budowie S19 odcinek Radzyń Podlaski — Kock za pomocą GPS.',
    },
    alternates: {
        canonical: 'https://s19-kock.vercel.app/radzyn-kock',
    },
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
