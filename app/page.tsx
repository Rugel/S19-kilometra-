'use client';
import React from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from 'react';
import { watchGeolocation } from "./utils/geolocalization";
//import dynamic from "next/dynamic";



export default function Home() {
  if (typeof window !== 'undefined') {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    let stopTracking: unknown = null;

    const startTracking = () => {
      setIsTracking(true);
      stopTracking = watchGeolocation(
        (position: React.SetStateAction<null>) => setLocation(position),
        (err: React.SetStateAction<null>) => setError(err),
        { enableHighAccuracy: true }
      );
    };

    const stopTrackingLocation = () => {
      if (stopTracking) stopTracking();
      setIsTracking(false);
    };

    useEffect(() => {
      return () => {
        // Zatrzymujemy śledzenie przy odmontowaniu komponentu
        if (stopTracking) stopTracking();
      };
    }, [stopTracking]);

    return (
      <div id="contener">
        <div id="content">
          <Header />
          <div className="info">
            <button className='start' onClick={startTracking} disabled={isTracking}>
              Rozpocznij
            </button>
            <button className='start' onClick={stopTrackingLocation} disabled={!isTracking}>
              Zatrzymaj
            </button>
            <div >
              <p id='result'>Szerokość: <span className="data">{location ? location.latitude : 'brak danych'}</span>
              </p>
              <p className="normal">Długość: <span className="data">{location ? location.longitude : 'brak danych'}</span>
              </p>
            </div>
            {error && <p>Błąd: {error}</p>}
          </div>
          <MapsSelect />
          <GeoLink />
        </div>
        <div id='map'><OpenMap /></div>
        <Footer />
      </div>
    );
  }
}
