import React, { useState, useEffect, useCallback } from "react";
import { watchGeolocation } from "../utils/geolocalization";

type Location = {
    latitude: number;
    longitude: number;
  };

export default function Test(){
    const [location, setLocation] = useState<Location | null>(null);
      const [error, setError] = useState<string | null>(null);
      const [isTracking, setIsTracking] = useState(false);
      const [stopTracking, setStopTracking] = useState<null | (() => void)>(null);
    
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
    
      const stopTrackingLocation = useCallback(() => {
        if (stopTracking) stopTracking();
        setIsTracking(false);
      }, [stopTracking]);
    
      useEffect(() => {
        return () => {
          if (stopTracking) stopTracking();
        };
      }, [stopTracking]);
      return(
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
      )
}