'use client';
import React from 'react';
//import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./components/MapCom'), { ssr: false, });

export default function Home() {

  return (
    <div id="contener">
      <div id="content">
        <Header />
        {/*<GeoLink />*/}
        <MapComponent />
        <Footer />
      </div></div>
  );
}



