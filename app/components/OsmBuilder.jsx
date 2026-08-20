'use client';

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ------------------------------------------------------------
// Konfiguracja typów drog (kolor i filtru)
// ------------------------------------------------------------
const ROAD_TYPES = [
    { value: "motorway",   label: "Drogi ekspresowe / autostrady", color: "#e11d48" },
    { value: "trunk",      label: "Drogi główne (trunk)",          color: "#f97316" },
    { value: "primary",    label: "Drogi pierwszorzędne (primary)", color: "#eab308" },
    { value: "secondary",  label: "Drogi drugorzędna (secondary)", color: "#22c55e" },
    { value: "tertiary",   label: "Drogi trzeciorzędna (tertiary)", color: "#3b82f6" },
    { value: "residential",label: "Drogi osiedlowe",              color: "#a855f7" },
    { value: "service",    label: "Sieci / dojazdy (service)",    color: "#64748b" },
];

const PRESETS = {
    kock:   { n: 51.66638, s: 51.59723, w: 22.44884, e: 22.48172 },
    radzyn: { n: 51.8055, s: 51.6554, w: 22.4609, e: 22.6328 },
};

const typeColor = (highway) => {
    if (highway === "construction") return "#ff5722"; // drogi w budowie
    const r = ROAD_TYPES.find((t) => t.value === highway);
    return r ? r.color : "#0ea5e9";
};

// ------------------------------------------------------------
// Pobierania linii z Overpass API
// modeBudo = true  -> tylko linii markowanych jako highway=construction (w budowie)
// modeBudo = false -> grupa typów dróg
// ------------------------------------------------------------
async function fetchWays(bbox, types, modeBudo) {
    const filter = types.join("|");
    const highwayFilter = modeBudo
        ? `way["highway"="construction"]`
        : `way["highway"~"^(${filter})$"]`;
    const query = `[out:json][timeout:60];
(
  ${highwayFilter}(${bbox.s},${bbox.w},${bbox.n},${bbox.e});
);
out body geom;
`;
    const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(query),
    });
    if (!res.ok) throw new Error(`Overpass API / ${res.status}`);
    const data = await res.json();
    return data.elements || [];
}

// ------------------------------------------------------------
// Przechwycenie kliknięcia na mapie (punkty linii / obiekti)
// ------------------------------------------------------------
function ClickCatcher({ mode, onLineClick, onObjectClick }) {
    useMapEvents({
        click(e) {
            if (mode === "line") onLineClick(e.latlng);
            else if (mode === "object") onObjectClick(e.latlng);
        },
    });
    return null;
}

function makeWrzelIcon(label) {
    return typeof window !== "undefined"
        ? L.divIcon({
            className: "map-marker-pin-container",
            html: `<div style="background:#ff5722;color:#fff;border:2px solid #fff;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;transform:translate(-50%,-50%);box-shadow:0 1px 3px rgba(0,0,0,0.5)">${label}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
        })
        : null;
}

function makePinIcon(label, color) {
    return typeof window !== "undefined"
        ? L.divIcon({
            className: "map-marker-pin-container",
            html: `<div class="map-marker-pin" style="background:${color}">${label}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
        })
        : null;
}
// ------------------------------------------------------------
// Główny component
// ------------------------------------------------------------
export default function OsmBuilder() {
    const [bbox, setBbox] = useState(PRESETS.radzyn);
    const [types, setTypes] = useState(["motorway", "trunk"]);
    const [fetched, setFetched] = useState([]);    // {id, name, type, coords, visible}
    const [lines, setLines] = useState([]);        // wlasnę linii {id, name, points, color}
    const [markers, setMarkers] = useState([]);    // objekti {id, name, lat, lng, color}
    const [mode, setMode] = useState("none");      // none | line | object
    const [draft, setDraft] = useState([]);        // punkty nowego lini
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const [exported, setExported] = useState("");
    const [lineColor, setLineColor] = useState("#0ea5e9");
    const [objColor, setObjColor] = useState("#dc3545");
    const [mapCenter, setMapCenter] = useState([51.7292, 22.5416]);
    const [onlyConstruction, setOnlyConstruction] = useState(true); // domyślnie tylko drogi w budowie
    const [showWyzle, setShowWyzle] = useState(true);   // pokazywotti/prykacosta punkty (węzły) lini
    const [nodes, setNodes] = useState([]);             // {id, lat, lng, wayId, label}

    const setBounds = (patch) => setBbox((prev) => {
        if (patch && typeof patch === "object" && (patch.n || patch.s)) {
            return { ...prev, ...patch };
        }
        return patch;
    });

    const toggleType = (v) =>
        setTypes((prev) => (prev.includes(v) ? prev.filter((t) => t !== v) : [...prev, v]));

    const handleFetch = async () => {
        if (!onlyConstruction && types.length === 0) { setError("Wybierz co najmniej jeden typ drogi (albo włącz „tylko drogi w budowie“)."); return; }
        setBusy(true);
        setError(null);
        try {
            const els = (await fetchWays(bbox, types, onlyConstruction)).filter((e) => e.type === "way");
            const ways = els.map((el) => {
                const coords = (el.geometry || []).map((p) => [p.lat, p.lon]);
                const tag = el.tags || {};
                // W trybie budowy właściwy typ drogi jest w tagu `construction` (np. construction=motorway)
                const hw = onlyConstruction
                    ? (tag.construction || "construction")
                    : (tag.highway || "unknown");
                const suffix = onlyConstruction
                    ? (tag.construction ? ` (w budowie: ${tag.construction})` : " (w budowie)")
                    : "";
                return {
                    id: `way-${el.id}`,
                    type: hw,
                    name: (tag.name || `Droga ${el.id}`) + suffix,
                    coords,
                    visible: true,
                };
            });
            setFetched(ways);
            // Zbiera węzły (punkty geometrii) lini — tylko w trybie budowy
            const allNodes = [];
            ways.forEach((w, wi) => {
                w.coords.forEach((c, ci) => {
                    allNodes.push({ id: `${w.id}-n-${ci}`, lat: c[0], lng: c[1], wayId: w.id, label: ci });
                });
            });
            setNodes(allNodes);
            setExported("");
            if (ways.length === 0) setError("Nie znalezono linii we wskazanym obszarze (bbox). W trybie budowy szukam highway=construction");
            else setError(`Znalezono ${ways.length} linii.`);
        } catch (e) {
            setError("Błąd pobierania. Sprawdź połączenie: " + e.message);
        } finally {
            setBusy(false);
        }
    };

    const toggleFetched = (id) =>
        setFetched((prev) => prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)));

    // ---- Nowa linia ----
    const onLineClick = (latlng) => setDraft((d) => [...d, [latlng.lat, latlng.lng]]);
    const finishLine = () => {
        if (draft.length >= 2) {
            setLines((prev) => [
                ...prev,
                { id: `line-${Date.now()}`, name: `Nowa droga ${prev.length + 1}`, points: draft, color: lineColor },
            ]);
        }
        setDraft([]);
    };
    const removeLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));

    // ---- Objekti ----
    const onObjectClick = (latlng) => {
        setMarkers((prev) => [
            ...prev,
            { id: `obj-${Date.now()}`, name: `Obiekt ${prev.length + 1}`, lat: latlng.lat, lng: latlng.lng, color: objColor },
        ]);
    };
    const removeMarker = (id) => setMarkers((prev) => prev.filter((m) => m.id !== id));
    const renameMarker = (id, name) =>
        setMarkers((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m)));

    const generateExport = useCallback(() => {
        const activeWays = fetched.filter((w) => w.visible).map((w) => ({
            id: w.id,
            name: w.name,
            type: w.type,
            coords: w.coords,
        }));
        setExported(JSON.stringify({ bbox, ways: activeWays, lines, markers }, null, 2));
    }, [bbox, fetched, lines, markers]);

    const clearAll = () => {
        setFetched([]);
        setLines([]);
        setMarkers([]);
        setDraft([]);
        setNodes([]);
        setExported("");
        setError(null);
    };

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exported || "");
            alert("Skopiowano do schowka.");
        } catch (e) {
            alert("Błąd kopiowania: " + e.message);
        }
    };

    const bboxInputs = [
        { k: "n", label: "N (lat max)" },
        { k: "s", label: "S (lat min)" },
        { k: "w", label: "W (lng min)" },
        { k: "e", label: "E (lng max)" },
    ];
return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Panel zasięgu i typów */}
            <section style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "1rem", background: "#fff" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    <button className="tap" onClick={() => { setBounds(PRESETS.radzyn); setMapCenter([(PRESETS.radzyn.n + PRESETS.radzyn.s) / 2, (PRESETS.radzyn.w + PRESETS.radzyn.e) / 2]); }}>
                        Preset: Radzyń–Kock
                    </button>
                    <button className="tap" onClick={() => { setBounds(PRESETS.kock); setMapCenter([(PRESETS.kock.n + PRESETS.kock.s) / 2, (PRESETS.kock.w + PRESETS.kock.e) / 2]); }}>
                        Preset: Obwodnica Kocka
                    </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {bboxInputs.map((bi) => (
                        <label key={bi.k} style={{ fontSize: "0.8rem" }}>
                            {bi.label}
                            <input
                                type="number" step="any"
                                value={bbox[bi.k]}
                                onChange={(e) => setBounds({ ...bbox, [bi.k]: parseFloat(e.target.value) })}
                                style={{ width: 110, marginLeft: 4, padding: 4, borderRadius: 4, border: "1px solid #ccc" }}
                            />
                        </label>
                    ))}
                </div>

                <div style={{ marginTop: "0.75rem" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>Pobieranie z OSM</div>
                    <label style={{ display: "inline-flex", gap: "0.4rem", fontSize: "0.85rem", alignItems: "center", marginBottom: "0.4rem" }}>
                        <input type="checkbox" checked={onlyConstruction} onChange={(e) => setOnlyConstruction(e.target.checked)} />
                        <strong>Tylko drogi w budowie (highway=construction)</strong>
                        — tylko linie/obiekti związane z budową
                    </label>
                    {onlyConstruction && (
                        <label style={{ display: "inline-flex", gap: "0.4rem", fontSize: "0.85rem", alignItems: "center" }}>
                            <input type="checkbox" checked={showWyzle} onChange={(e) => setShowWyzle(e.target.checked)} />
                            Węzły (punkty) linii budowy
                        </label>
                    )}
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                    {!onlyConstruction && <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>Typy drog (albo włącz „tylko drogi w budowie“)</div>}
                    {onlyConstruction && <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>Typ drogi w budowie (tag „construction“)</div>}
                    {onlyConstruction && <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "0.25rem" }}>
                        Drogi w budowie pobierane automatiscznie (z tagą konstrukcji). Listy typów dróg tu nie wznachają.
                    </div>}
                    {!onlyConstruction && <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {ROAD_TYPES.map((t) => (
                            <label key={t.value} style={{ display: "inline-flex", gap: "0.3rem", fontSize: "0.78rem", alignItems: "center" }}>
                                <input type="checkbox" checked={types.includes(t.value)} onChange={() => toggleType(t.value)} />
                                <span style={{ width: 10, height: 10, background: t.color, borderRadius: 2, display: "inline-block" }} />
                                {t.label}
                            </label>
                        ))}
                    </div>}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                    <button className="tap" onClick={handleFetch} disabled={busy} style={{ background: "var(--primary-color)", color: "#fff", cursor: busy ? "wait" : "pointer" }}>
                        {busy ? "Pobieram…" : "Pobierz linie z OSM"}
                    </button>
                    <button className="tap" onClick={generateExport} style={{ background: "var(--success-color)", color: "#fff" }}>Generuj export</button>
                    <button className="tap" onClick={clearAll} style={{ background: "var(--danger-color)", color: "#fff" }}>Wyczyść</button>
                </div>
                {busy && <div style={{ marginTop: "0.5rem", color: "var(--text-light)", fontSize: "0.8rem" }}>Wysyłam zapytanie do Overpass…</div>}
                {error && <div style={{ marginTop: "0.5rem", color: "#b45309", fontSize: "0.8rem" }}>{error}</div>}
            </section>

            {/* Wybór trybu */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                {[
                    { v: "none", l: "Nawigacja / podgląd" },
                    { v: "line", l: "Rysowanie linii (drogi)" },
                    { v: "object", l: "Dodaj obiekt" },
                ].map((m) => (
                    <button key={m.v} className="tap" onClick={() => setMode(m.v)} style={mode === m.v ? { background: "var(--primary-color)", color: "#fff" } : {}}>
                        {m.l}
                    </button>
                ))}
                {mode === "line" && (
                    <>
                        <button className="tap" onClick={finishLine} disabled={draft.length < 2} style={{ background: "var(--success-color)", color: "#fff" }}>
                            Zapisz linię ({draft.length} pkt)
                        </button>
                        <button className="tap" onClick={() => setDraft([])} disabled={draft.length === 0}>Annulluj</button>
                        <label style={{ display: "inline-flex", gap: "0.3rem", alignItems: "center", fontSize: "0.8rem" }}>
                            Kolor linii: <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
                        </label>
                    </>
                )}
                {mode === "object" && (
                    <label style={{ display: "inline-flex", gap: "0.3rem", alignItems: "center", fontSize: "0.8rem" }}>
                        Kolor obiektu: <input type="color" value={objColor} onChange={(e) => setObjColor(e.target.value)} />
                    </label>
                )}
            </div>
{/* Mapa */}
            <div style={{ height: "70vh" }}>
                <MapContainer center={mapCenter} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />
                    <ClickCatcher mode={mode} onLineClick={onLineClick} onObjectClick={onObjectClick} />

                    {fetched.filter((w) => w.visible).map((w) => (
                        <Polyline key={w.id} positions={w.coords} pathOptions={{ color: typeColor(w.type), weight: 3, opacity: 0.9 }} />
                    ))}
                    {lines.map((l) => (
                        <Polyline key={l.id} positions={l.points} pathOptions={{ color: l.color, weight: 3, opacity: 0.8, dashArray: "6,4" }} />
                    ))}
                    {draft.length > 0 && (
                        <Polyline positions={draft} pathOptions={{ color: lineColor, weight: 3, opacity: 0.85, dashArray: "6,6" }} />
                    )}
                    {markers.map((m) => (
                        <Marker key={m.id} position={[m.lat, m.lng]} icon={makePinIcon(m.name, m.color)}>
                            <Popup>{m.name}<br />{m.lat.toFixed(5)}, {m.lng.toFixed(5)}</Popup>
                        </Marker>
                    ))}
                    {onlyConstruction && showWyzle && nodes.map((n) => (
                        <Marker key={n.id} position={[n.lat, n.lng]} icon={makeWrzelIcon(n.label)}>
                            <Popup>węzy {n.label} linii {n.wayId}<br />{n.lat.toFixed(5)}, {n.lng.toFixed(5)}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
{/* Listy zwartokci */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 320px", border: "1px solid #e0e0e0", borderRadius: 8, padding: "0.75rem" }}>
                    <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>Pobrane linie z OSM ({fetched.length})</h4>
                    {fetched.length === 0 && <small style={{ color: "var(--text-light)" }}>Klikni „Pobierz linie z OSM“, aby zaimportować linie z mapy.</small>}
                    <div style={{ maxHeight: 200, overflowY: "auto" }}>
                        {fetched.map((w) => (
                            <label key={w.id} style={{ display: "flex", gap: "0.4rem", fontSize: "0.8rem", alignItems: "center" }}>
                                <input type="checkbox" checked={w.visible} onChange={() => toggleFetched(w.id)} />
                                <span style={{ width: 10, height: 10, background: typeColor(w.type), display: "inline-block" }} />
                                {w.name}
                                <small style={{ opacity: 0.6 }}>({w.coords.length} p)</small>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ flex: "1 1 320px", border: "1px solid #e0e0e0", borderRadius: 8, padding: "0.75rem" }}>
                    <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>Własne linie ({lines.length})</h4>
                    {lines.length === 0 && <small style={{ color: "var(--text-light)" }}>Tryb „Rysowanie linii“ i potem „Zapisz linię“</small>}
                    {lines.map((l) => (
                        <div key={l.id} style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.8rem", alignItems: "center" }}>
                            <span>{l.name} ({l.points.length} pkt)</span>
                            <button className="tap" onClick={() => removeLine(l.id)} style={{ background: "var(--danger-color)", color: "#fff", fontSize: "0.7rem" }}>usuń</button>
                        </div>
                    ))}
                </div>

                <div style={{ flex: "1 1 320px", border: "1px solid #e0e0e0", borderRadius: 8, padding: "0.75rem" }}>
                    <h4 style={{ margin: 0, marginBottom: "0.25rem" }}>Objekty ({markers.length})</h4>
                    {markers.length === 0 && <small style={{ color: "var(--text-light)" }}>Tryb „Dodaj obiekt“ — klikaj w mapę, zmieniaj nazwę w polu</small>}
                    {markers.map((m) => (
                        <div key={m.id} style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", alignItems: "center", marginBottom: "0.2rem" }}>
                            <input value={m.name} onChange={(e) => renameMarker(m.id, e.target.value)} style={{ width: 140, padding: 4, borderRadius: 4, border: "1px solid #ccc" }} />
                            <span style={{ opacity: 0.6 }}>{m.lat.toFixed(5)}, {m.lng.toFixed(5)}</span>
                            <button className="tap" onClick={() => removeMarker(m.id)} style={{ background: "var(--danger-color)", color: "#fff", fontSize: "0.7rem" }}>usuń</button>
                        </div>
                    ))}
                </div>
            </div>
{/* Export */}
            <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <h4 style={{ margin: 0 }}>Export (JSON)</h4>
                    <button className="tap" onClick={generateExport}>Generuj</button>
                    <button className="tap" onClick={copyExport} style={{ background: "var(--success-color)", color: "#fff" }}>Kopiuj</button>
                </div>
                <textarea
                    value={exported}
                    onChange={(e) => setExported(e.target.value)}
                    rows={10}
                    style={{ width: "100%", fontFamily: "monospace", fontSize: "0.75rem", borderRadius: 6, border: "1px solid #ccc", padding: 8, marginTop: "0.5rem" }}
                    placeholder="Po dodaniu linii/obiektów klikni Generuj i potem Kopiuj."
                />
                <p style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "0.25rem" }}>
                    Skopiowany JSON možecie wkleić do pliku w <code>app/utils/…</code> i użyć w MapCom (elementy Polyline / Marker).
                </p>
            </div>
        </div>
    );
}