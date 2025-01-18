
'use client';
import React, { useState, useCallback } from "react";
import { watchGeolocation } from "../utils/geolocalization";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import Recta from "./Recta";
import { prawaStr } from "../utils/Points";
import { lewaStr } from "../utils/Points";



export default function Localization() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [stopTracking, setStopTracking] = useState(null);

  const startTracking = useCallback(() => {
    setIsTracking(true);
    const stop = watchGeolocation(
      (position) => setLocation(position),
      (err) => setError(err.message || "Wystąpił błąd"),
      { enableHighAccuracy: true }
    );
    setStopTracking(() => stop);
    return(
      <MapContainer
            center={[51.631805, 22.46528]}
            zoom={13}
            style={{ height: "700px", width: "100%" }}
            fullscreenControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Recta />
            <Polyline positions={prawaStr} pathOptions={polylineStyle} />
            <Polyline positions={lewaStr} pathOptions={polylineStyle} />
          </MapContainer>
    )
  }, []);

   const stopTrackingLocation = useCallback(() => {
    if (stopTracking) stopTracking();
    setIsTracking(false);
  }, [stopTracking]);

  return (
    <div className="info">
      <button className="start" onClick={startTracking} disabled={isTracking}>
        START
      </button>
      <button className="start" onClick={stopTrackingLocation} disabled={!isTracking}>
        STOP
      </button>
      <div>
        <p id="result">
          Szerokość: <span className="data">{location ? location.latitude : "brak danych"}</span>
        </p>
        <p className="normal">
          Długość: <span className="data">{location ? location.longitude : "brak danych"}</span>
        </p>
      </div>
      {error && <p>Błąd: {error}</p>}
    </div>
  );
};

