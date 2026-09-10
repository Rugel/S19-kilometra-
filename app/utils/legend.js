// Jedno źródło prawdy dla legendy mapy.
// Opisuje, co oznaczają kolorowe linie naniesione na mapę
// (oś trasy S19, drogi w budowie z importu OSM, linie pomocnicze)
// oraz pozostałe znaczniki.

// Kolory linii pobranych z OSM (domyślnie drogi w budowie).
// Każdy typ ma ODRÓŻNIAJĄCY SIĘ zestaw: kolor + grubość + wzór linii
// (ciągła / przerywana / kropkowana), żeby dało się je rozpoznać
// na mapie i w legendzie mimo podobnych odcieni.
export const WAY_STYLES = {
    motorway: { color: "#e11d48", weight: 6 },
    motorway_link: { color: "#f97316", weight: 4, dashArray: "10,5" },
    trunk: { color: "#9a3412", weight: 5 },
    primary: { color: "#a16207", weight: 4 },
    secondary: { color: "#15803d", weight: 4 },
    tertiary: { color: "#1d4ed8", weight: 3 },
    unclassified: { color: "#6b7280", weight: 3 },
    // Literówka występująca w danych OSM – ten sam styl.
    unclassied: { color: "#6b7280", weight: 3 },
    residential: { color: "#7e22ce", weight: 3, dashArray: "8,4" },
    service: { color: "#334155", weight: 3, dashArray: "2,4" },
    construction: { color: "#ff5722", weight: 5, dashArray: "12,6" },
    track: { color: "#92400e", weight: 2, dashArray: "6,4" },
    footway: { color: "#0f766e", weight: 2, dashArray: "1,5" },
    steps: { color: "#57534e", weight: 2, dashArray: "1,4" },
    cycleway: { color: "#4d7c0f", weight: 3, dashArray: "3,3" },
    path: { color: "#65a30d", weight: 2, dashArray: "6,3" },
};

export const FALLBACK_WAY_STYLE = { color: "#0ea5e9", weight: 3, dashArray: "2,4" };

// Kompatybilność wstecz: sama barwa typu drogi.
export const WAY_COLORS = Object.fromEntries(
    Object.entries(WAY_STYLES).map(([type, style]) => [type, style.color])
);

export const FALLBACK_WAY_COLOR = FALLBACK_WAY_STYLE.color;

export const wayStyle = (t) => WAY_STYLES[t] || FALLBACK_WAY_STYLE;

export const wayColor = (t) => wayStyle(t).color;

// Kropkowana = krótka kreska (pierwszy segment wzoru <= 2).
export const isDottedStyle = (dashArray) => {
    if (!dashArray) return false;
    const first = parseFloat(String(dashArray).split(",")[0]);
    return Number.isFinite(first) && first <= 2;
};

// Styl CSS obramowania odpowiadający wzorowi linii na mapie.
export const dashCssStyle = (dashArray) => {
    if (!dashArray) return "solid";
    return isDottedStyle(dashArray) ? "dotted" : "dashed";
};

// Komplet opcji rysowania linii (leaflet pathOptions) dla typu drogi.
export const wayPathOptions = (t) => {
    const s = wayStyle(t);
    const opts = { color: s.color, weight: s.weight ?? 4, opacity: 0.85 };
    if (s.dashArray) {
        opts.dashArray = s.dashArray;
        if (isDottedStyle(s.dashArray)) {
            opts.lineCap = "round";
        }
    }
    return opts;
};

// Dopisek do etykiety legendy opisujący wzór linii.
export const styleHint = (dashArray) =>
    !dashArray ? "" : isDottedStyle(dashArray) ? " – linia kropkowana" : " – linia przerywana";

// Polskie opisy typów dróg z importu OSM (wszystkie obiekty
// w `app/utils/lines.json` mają status "w budowie").
const WAY_TYPE_LABELS = {
    motorway: "Droga ekspresowa S19 (w budowie)",
    motorway_link: "Łącznica drogowa – zjazd / wjazd (w budowie)",
    trunk: "Droga główna ruchu przyspieszonego (w budowie)",
    primary: "Droga krajowa / wojewódzka (w budowie)",
    secondary: "Droga powiatowa (w budowie)",
    tertiary: "Droga gminna / lokalna (w budowie)",
    unclassified: "Droga nieklasyfikowana (w budowie)",
    // Literówka występująca w danych OSM – mapujemy tak samo.
    unclassied: "Droga nieklasyfikowana (w budowie)",
    residential: "Droga osiedlowa / dojazdowa (w budowie)",
    service: "Droga serwisowa / techniczna (w budowie)",
    track: "Droga polna / leśna",
    footway: "Ciąg pieszy",
    steps: "Schody",
    cycleway: "Droga rowerowa",
    path: "Ścieżka",
    construction: "Droga / teren budowy",
};

export const wayTypeLabel = (t) => WAY_TYPE_LABELS[t] || `Droga (typ OSM: ${t})`;

// Proste escapowanie nazw pochodzących z eksportu buildera,
// bo legenda wstrzykuje HTML do kontrolki Leaflet.
const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

// Buduje grupy pozycji legendy tylko dla elementów faktycznie
// rysowanych na mapie (przekazane typy dróg, linie, znaczniki).
// Zwraca: [{ title, items: [{ color?, dashed?, kind?, label }] }]
export function buildLegendGroups({
    routeColor = "red",
    section = "kock",
    wayTypes = [],
    customLines = [],
    customMarkers = [],
} = {}) {
    const sectionName = section === "radzyn" ? "Radzyń Podlaski" : "Kock";

    const groups = [
        {
            title: "Trasa S19",
            items: [
                {
                    color: routeColor,
                    weight: 5,
                    label: `Oś trasy S19 – jezdnia prawa i lewa (odcinek ${sectionName})`,
                },
            ],
        },
    ];

    const wayItems = (wayTypes || []).map((t) => {
        const s = wayStyle(t);
        return {
            color: s.color,
            weight: s.weight,
            dashArray: s.dashArray,
            label: `${wayTypeLabel(t)}${styleHint(s.dashArray)}`,
        };
    });
    if (wayItems.length > 0) {
        groups.push({ title: "Drogi w budowie (dane OSM)", items: wayItems });
    }

    // Linie pomocnicze dodane w /builder (rysowane linią przerywaną "6,4").
    const seenLines = new Map();
    (customLines || []).forEach((l) => {
        const color = l.color || FALLBACK_WAY_COLOR;
        const name = escapeHtml(l.name || "Linia pomocnicza (builder)");
        const key = `${color}|${name}`;
        if (!seenLines.has(key)) {
            seenLines.set(key, { color, weight: 3, dashArray: "6,4", label: name });
        }
    });
    if (seenLines.size > 0) {
        groups.push({ title: "Linie pomocnicze", items: [...seenLines.values()] });
    }

    const markerItems = [
        { kind: "pill", label: "Obiekty inżynierskie (WD, PZM, PZD, MOP …)" },
    ];
    if (section === "radzyn") {
        markerItems.push({ kind: "pill", label: "Punkty charakterystyczne (Początek, Koniec, WMB)" });
    }
    if (section === "kock") {
        markerItems.push({ kind: "office", label: "Biuro budowy POLAQUA" });
    }
    if ((customMarkers || []).length > 0) {
        markerItems.push({ kind: "pin", label: "Znaczniki dodane w builderze" });
    }
    markerItems.push({ kind: "gps", label: "Twoja lokalizacja (GPS, po START)" });
    groups.push({ title: "Znaczniki", items: markerItems });

    return groups;
}
