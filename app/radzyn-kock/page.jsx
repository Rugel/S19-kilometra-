'use client';
import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { CookieBanner } from '../components/CookieBanner';
// Markery usunięte z importów ze względu na błąd SSR (window is not defined)
import { prawaStr, lewaStr, polylineStyle } from '../utils/PointsRadzynKock';

const MapComponent = dynamic(() => import('../components/MapCom'), { ssr: false, });

export default function RadzynKockPage() {
    return (
        <>
            <main className="contener">
                <div className="main-content">
                    <Header />
                    <h1 style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0.5rem 0 0 0', color: 'var(--text-color)' }}>
                        S19 — Radzyń Podlaski - Kock
                    </h1>
                    <h2 style={{ textAlign: 'center', fontSize: '1rem', fontWeight: '400', margin: '0 0 0.5rem 0', color: 'var(--text-color)', opacity: 0.8 }}>
                        kilometraż na budowie - odczyt
                    </h2>
                    <MapComponent
                        activePrawaStr={prawaStr}
                        activeLewaStr={lewaStr}
                        activePolylineStyle={polylineStyle}
                        initialCenter={[51.7292, 22.5416]}
                        initialZoom={12}
                        section="radzyn"
                        offset={0.19239}
                    />

                    <article className="seo-content" style={{ marginTop: '2rem', padding: '1rem', color: 'var(--text-color)', opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Odcinek S19 Radzyń Podlaski – Kock: kluczowy fragment Via Carpatia</h3>
                        <p style={{ marginBottom: '1rem' }}>
                            Budowa drogi ekspresowej <strong>S19 na odcinku Radzyń Podlaski - Kock</strong> o długości około <strong>18,1 km</strong> to strategiczna inwestycja realizowana przez firmę <strong>Polaqua</strong>. Całkowita wartość kontraktu opiewa na kwotę ponad <strong>626 mln zł</strong>. Nowa trasa prowadzona w systemie "Projektuj i buduj" ma odciążyć ruch lokalny i znacząco skrócić czas przejazdu na osi północ-południe.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            W zakres zadania wchodzi budowa <strong>węzła Radzyń Podlaski Południe</strong>, węzła Borki, dwóch Miejsc Obsługi Podróżnych oraz licznych obiektów inżynierskich, w tym wiaduktów i przejść dla zwierząt. Inwestycja ma na celu zmaksymalizowanie trwałości i bezpieczeństwa tej części szlaku <strong>Via Carpatia</strong>. Planowane oddanie do użytku przewidziano na <strong>pierwszą połowę 2028 roku</strong>.
                        </p>
                        <p>
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
