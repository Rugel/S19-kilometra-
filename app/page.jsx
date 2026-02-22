'use client';
import React from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { CookieBanner } from './components/CookieBanner';

// Markery usunięte z importów ze względu na błąd SSR (window is not defined)

const MapComponent = dynamic(() => import('./components/MapCom'), { ssr: false, });

export default function Home() {
  return (
    <>
      <main className="contener">
        <div className="main-content">
          <Header />
          <h1 style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0.5rem 0 0 0', color: 'var(--text-color)' }}>
            S19 — Obwodnica Kocka
          </h1>
          <h2 style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '400', margin: '0 0 0.5rem 0', color: 'var(--text-color)', opacity: 0.8 }}>
            kilometraż na budowie - odczyt
          </h2>
          <MapComponent section="kock" />

          <article className="seo-content" style={{ marginTop: '2rem', padding: '1rem', color: 'var(--text-color)', opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.6' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Drugi etap budowy obwodnicy Kocka i Woli Skromowskiej (S19)</h3>
            <p style={{ marginBottom: '1rem' }}>
              W ramach budowy międzynarodowego szlaku <strong>Via Carpatia</strong>, realizowana jest inwestycja polegająca na dobudowie drugiej jezdni obwodnicy Kocka i Woli Skromowskiej o długości <strong>ok. 7,8 km</strong>. Istniejąca od 2011 roku trasa początkowo powstała jako droga jednojezdniowa, jednak rosnące natężenie ruchu wymusiło jej rozbudowę do pełnego profilu drogi ekspresowej <strong>S19</strong>.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Wykonawcą prac jest firma <strong>Polaqua</strong>, a wartość kontraktu wynosi około <strong>220 mln zł</strong>. Rozbudowa obejmuje nie tylko poprowadzenie nowej, dwupasowej jezdni, ale również przebudowę łącznic na węzłach <strong>Kock Północ</strong> i <strong>Kock Południe</strong>. W ramach zadania powstają nowe obiekty inżynierskie, w tym mosty i wiadukty. Planowane zakończenie prac drogowych przewidziano na <strong>maj 2026 roku</strong>.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>S19 Kilometraż</strong> pozwala na szybki i w miarę dokładny odczyt pikietażu drogowego, ułatwiając nawigację na terenie budowy dla wszystkich osób zaangażowanych w realizację projektu.
            </p>
          </article>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}




