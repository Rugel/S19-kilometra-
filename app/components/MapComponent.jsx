'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import GeoLink from "./GeoLink";
import MapsSelect from "./MapsSelect";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// Dynamiczny import bez SSR
const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [result, setResult] = useState(null);
  const [mapType, setMapType] = useState("osm");

  const handleClickStart = () => {
    if (navigator.geolocation && !watchId) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
        },
        (error) => {
          console.error("Błąd geolokalizacji:", error);
          alert("Nie udało się uzyskać lokalizacji.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
      setWatchId(id);
    }
  };

  const handleClickStop = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  return (
    <div>
      <div id="link">
        {location ? (
          <GeoLink location={location} />
        ) : (
          <a
            href="https://mapy.geoportal.gov.pl/mobile/#fullExtent&1737922676017"
            target="blank"
          >
            dodatkowe dane w serwisie Geoportal
          </a>
        )}
      </div>
      <MapsSelect onChange={setMapType} />
      <div id="info">
        {result ? (
          <p>
            KM: <span className="data">{result.length}</span>
          </p>
        ) : (
          <p>
            KM:{" "}
            <span className="data" style={{ fontWeight: 100, color: "grey" }}>
              brak danych
            </span>
          </p>
        )}
      </div>
      <button
        className="start"
        onClick={handleClickStart}
        style={{ marginRight: "10px" }}
      >
        START
      </button>
      <button className="stop" onClick={handleClickStop}>
        STOP
      </button>
      <div id="map">
        <MapInner
          location={location}
          setResult={setResult}
          mapType={mapType}
        />
      </div>
    </div>
  );
};

export default MapComponent;
