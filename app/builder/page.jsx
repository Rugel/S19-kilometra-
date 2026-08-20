'use client';
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CookieBanner } from "../components/CookieBanner";

// Narzędzie OSM jest dostępne tylko w trybie deweloperskim (npm run dev).
// W wersji produkcyjnej trasa /builder nie ładuje komponentu mapy.
const isDev = process.env.NODE_ENV === "development";
const OsmBuilder = isDev ? dynamic(() => import("../components/OsmBuilder"), { ssr: false }) : null;

export default function BuilderPage() {
    return (
        <>
            <main className="contener">
                <div className="main-content">
                    <Header />
                    <h1 style={{ textAlign: "center", fontSize: "1.2rem", margin: "0.5rem 0 0 0", color: "var(--text-color)" }}>
                        Narzędzie — drogi i obiekty z OpenStreetMap
                    </h1>
                    <h2 style={{ textAlign: "center", fontSize: "1rem", fontWeight: "400", margin: "0 0 0.5rem 0", color: "var(--text-color)", opacity: 0.8 }}>
                        pobieranie linii dróg z OSM oraz dodawanie własnych dróg i obiektów na mapę
                    </h2>
                    {isDev ? <OsmBuilder /> : (
                        <p style={{ color: "var(--text-light)", fontSize: "0.9rem", textAlign: "center" }}>
                            Narzędzie OSM (pobieranie linii i obiektów z mapy budowy) jest dostępne tylko w trybie deweloperskim <code>npm run dev</code>.
                        </p>
                    )}
                </div>
            </main>
            <Footer />
            <CookieBanner />
        </>
    );
}