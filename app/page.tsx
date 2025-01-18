'use client';
import React from 'react';
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'leaflet/dist/leaflet.css';
//import Localization from "./components/Localization";
import dynamic from 'next/dynamic';
//import MapComponent from './components/MapCom'

const MapComponent = dynamic(() => import('./components/MapCom'), { ssr: false, });

export default function Home() {

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <MapsSelect />
        <GeoLink />
        <MapComponent />
        <Footer />
      </div></div>
  );
}



