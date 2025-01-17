'use client';
import React from 'react';
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Localization from "./components/Localization";
import dynamic from 'next/dynamic';

const OpenMap = dynamic(() => import('./components/OpenMap'), {
  ssr: false,
});

export default function Home() {

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <Localization />
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



