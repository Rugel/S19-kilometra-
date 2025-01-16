'use client';
import React from 'react';
//import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Test from "./components/Localization";
import dynamic from 'next/dynamic';

const OpenMap = dynamic(() => import('./components/OpenMap'), {
  ssr: false, // Wyłączenie renderowania na serwerze
});

export default function Home() {

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <Test />
        <MapsSelect />
        <GeoLink />
      </div>
      <div id="map">
        <OpenMap />
      </div>
      <Footer />
    </div>
  );
}



