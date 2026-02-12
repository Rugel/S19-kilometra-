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
            <div className="contener">
                <div className="main-content">
                    <Header />
                    <h1 style={{ textAlign: 'center', fontSize: '1.2rem', margin: '0.5rem 0 0 0', color: 'var(--text-color)' }}>
                        S19 — Odcinek Radzyń Podlaski - Kock
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

                </div>
            </div>
            <Footer />
            <CookieBanner />
        </>
    );
}
