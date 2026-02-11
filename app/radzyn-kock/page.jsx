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
