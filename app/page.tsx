'use client';
import React from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { CookieBanner } from './components/CookieBanner';

const MapComponent = dynamic(() => import('./components/MapCom'), { ssr: false, });

export default function Home() {

  return (
    <div className="contener">
      <div id="content">
        <Header />
        <MapComponent />
        <Footer />
        <CookieBanner />
      </div></div>
  );
}



