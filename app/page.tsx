/*'use client';
import React from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
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

'use client';
import React, { useState, useEffect, useCallback } from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { watchGeolocation } from "./utils/geolocalization";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [stopTracking, setStopTracking] = useState<null | (() => void)>(null);

  // Funkcja do rozpoczęcia śledzenia lokalizacji
  const startTracking = useCallback(() => {
    setIsTracking(true);
    const stop = watchGeolocation(
      (position: React.SetStateAction<null>) => setLocation(position),
      (err: React.SetStateAction<null>) => setError(err),
      { enableHighAccuracy: true }
    );
    setStopTracking(() => stop); // Przechowujemy funkcję zatrzymującą
  }, []);

  // Funkcja do zatrzymania śledzenia lokalizacji
  const stopTrackingLocation = useCallback(() => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
  }, [stopTracking]);

  // Zatrzymywanie śledzenia przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      if (stopTracking) stopTracking();
    };
  }, [stopTracking]);

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <div className="info">
          <button className="start" onClick={startTracking} disabled={isTracking}>
            Rozpocznij
          </button>
          <button className="start" onClick={stopTrackingLocation} disabled={!isTracking}>
            Zatrzymaj
          </button>
          <div>
            <p id="result">
              Szerokość: <span className="data">{location ? location.latitude : 'brak danych'}</span>
            </p>
            <p className="normal">
              Długość: <span className="data">{location ? location.longitude : 'brak danych'}</span>
            </p>
          </div>
          {error && <p>Błąd: {error}</p>}
        </div>
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
*/
/*'use client';
import React, { useState, useEffect, useCallback } from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { watchGeolocation } from "./utils/geolocalization";

// Definiujemy typ dla lokalizacji
type Location = {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null); // Typujemy lokalizację jako `Location | null`
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [stopTracking, setStopTracking] = useState<null | (() => void)>(null);

  // Funkcja do rozpoczęcia śledzenia lokalizacji
  const startTracking = useCallback(() => {
    setIsTracking(true);
    const stop = watchGeolocation(
      (position: Location) => setLocation(position as Location), // Rzutowanie na `Location`
      (err: { message: any; }) => setError(err.message || "Wystąpił błąd"),
      { enableHighAccuracy: true }
    );
    setStopTracking(() => stop); // Przechowujemy funkcję zatrzymującą
  }, []);

  // Funkcja do zatrzymania śledzenia lokalizacji
  const stopTrackingLocation = useCallback(() => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
  }, [stopTracking]);

  // Zatrzymywanie śledzenia przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      if (stopTracking) stopTracking();
    };
  }, [stopTracking]);

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <div className="info">
          <button className="start" onClick={startTracking} disabled={isTracking}>
            Rozpocznij
          </button>
          <button className="start" onClick={stopTrackingLocation} disabled={!isTracking}>
            Zatrzymaj
          </button>
          <div>
            <p id="result">
              Szerokość: <span className="data">{location ? location.latitude : 'brak danych'}</span>
            </p>
            <p className="normal">
              Długość: <span className="data">{location ? location.longitude : 'brak danych'}</span>
            </p>
          </div>
          {error && <p>Błąd: {error}</p>}
        </div>
        <MapsSelect />
        <GeoLink />
      </div>
      <div id="map">
        <OpenMap />
      </div>
      <Footer />
    </div>
  );
}*/
/*'use client';
import React, { useState, useEffect, useCallback } from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { watchGeolocation } from "./utils/geolocalization";

// Definiujemy typ dla lokalizacji
type Location = {
  latitude: number;
  longitude: number;
};

// Definiujemy typ błędu geolokalizacji (opcjonalnie)
type GeolocationError = {
  message: string;
};

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null); // Typujemy lokalizację jako `Location | null`
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [stopTracking, setStopTracking] = useState<null | (() => void)>(null);

  // Funkcja do rozpoczęcia śledzenia lokalizacji
  const startTracking = useCallback(() => {
    setIsTracking(true);
    const stop = watchGeolocation(
      (position: Location) => setLocation(position), // Użycie precyzyjnego typu
      (err: GeolocationError) => setError(err.message || "Wystąpił błąd"),
      { enableHighAccuracy: true }
    );
    setStopTracking(() => stop); // Przechowujemy funkcję zatrzymującą
  }, []);

  // Funkcja do zatrzymania śledzenia lokalizacji
  const stopTrackingLocation = useCallback(() => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
  }, [stopTracking]);

  // Zatrzymywanie śledzenia przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      if (stopTracking) stopTracking();
    };
  }, [stopTracking]);

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <div className="info">
          <button className="start" onClick={startTracking} disabled={isTracking}>
            Rozpocznij
          </button>
          <button className="start" onClick={stopTrackingLocation} disabled={!isTracking}>
            Zatrzymaj
          </button>
          <div>
            <p id="result">
              Szerokość: <span className="data">{location ? location.latitude : 'brak danych'}</span>
            </p>
            <p className="normal">
              Długość: <span className="data">{location ? location.longitude : 'brak danych'}</span>
            </p>
          </div>
          {error && <p>Błąd: {error}</p>}
        </div>
        <MapsSelect />
        <GeoLink />
      </div>
      <div id="map">
        <OpenMap />
      </div>
      <Footer />
    </div>
  );
}*/
/*'use client';
import React, { useState, useEffect, useCallback } from "react";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { watchGeolocation } from "./utils/geolocalization";

// Definiujemy typ dla lokalizacji
type Location = {
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [stopTracking, setStopTracking] = useState<null | (() => void)>(null);

  // Funkcja do rozpoczęcia śledzenia lokalizacji
  const startTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsTracking(true);
      const stop = watchGeolocation(
        (position: Location) => setLocation(position),
        (err: { message: string }) => setError(err.message || "Wystąpił błąd"),
        { enableHighAccuracy: true }
      );
      setStopTracking(() => stop);
    }
  }, []);

  // Funkcja do zatrzymania śledzenia lokalizacji
  const stopTrackingLocation = useCallback(() => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
  }, [stopTracking]);

  // Zatrzymywanie śledzenia przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      if (stopTracking) stopTracking();
    };
  }, [stopTracking]);

  // Renderowanie tylko po stronie klienta
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div id="contener">
      <div id="content">
        <Header />
        <div className="info">
          <button className="start" onClick={startTracking} disabled={isTracking}>
            Rozpocznij
          </button>
          <button className="start" onClick={stopTrackingLocation} disabled={!isTracking}>
            Zatrzymaj
          </button>
          <div>
            <p id="result">
              Szerokość: <span className="data">{location ? location.latitude : 'brak danych'}</span>
            </p>
            <p className="normal">
              Długość: <span className="data">{location ? location.longitude : 'brak danych'}</span>
            </p>
          </div>
          {error && <p>Błąd: {error}</p>}
        </div>
        <MapsSelect />
        <GeoLink />
      </div>
      <div id="map">
        <OpenMap />
      </div>
      <Footer />
    </div>
  );
}*/
'use client';
import React from 'react';
//import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Test from "./components/testStart";
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



