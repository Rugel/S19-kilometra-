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
      <div className="contener">
        <div className="main-content">
          <Header />
          <MapComponent section="kock" />

        </div>
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}




