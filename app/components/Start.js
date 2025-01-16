'use client';
import { useState, useEffect } from 'react';
import { watchGeolocation } from "../utils/geolocalization";

export default function GeolocationWatcher() {
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
  };

  useEffect(() => {
    return () => {
      // Zatrzymujemy śledzenie przy odmontowaniu komponentu
      if (stopTracking) stopTracking();
    };
  }, []);

  return (
    <div>
      <button className='start' onClick={startTracking} disabled={isTracking}>
        Rozpocznij
      </button>
      <button className='start' onClick={stopTrackingLocation} disabled={!isTracking}>
        Zatrzymaj
      </button>

      {location && (
        <p>
          Szerokość: {location.latitude}, Długość: {location.longitude}
        </p>
      )}
      {error && <p>Błąd: {error}</p>}
    </div>
  );
}

