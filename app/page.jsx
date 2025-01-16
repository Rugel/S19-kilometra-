'use client';
import React from "react";
import 'leaflet/dist/leaflet.css';
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from 'react';
import { watchGeolocation } from "./utils/geolocalization";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  let stopTracking = null;

  const startTracking = () => {
    setIsTracking(true);
    stopTracking = watchGeolocation(
      (position) => setLocation(position),
      (err) => setError(err),
      { enableHighAccuracy: true }
    );
  };

  const stopTrackingLocation = () => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
    console.log('zatrzymano');
  };

  useEffect(() => {
    return () => {
      // Zatrzymujemy śledzenie przy odmontowaniu komponentu
      if (stopTracking) stopTracking();
    };
  }, []);

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
            <p id='result'>Szerokość: <span className="data">{location ? location.latitude : ' brak danych'}</span>
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
