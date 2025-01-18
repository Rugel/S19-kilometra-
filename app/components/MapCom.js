
/*'use client';
import { useState } from "react";
//import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { prawaStr } from "../utils/Points";
import { lewaStr } from "../utils/Points";
import { polylineStyle } from "../utils/Points";
import Recta from "./Recta";
import "leaflet.fullscreen/Control.FullScreen.css";
import 'leaflet/dist/leaflet.css';
import "leaflet.fullscreen";
import L from 'leaflet';

// Lazy loading Leaflet map to prevent SSR issues
//const Map = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false, });


L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
  

// Komponent do centrowania mapy
const CenterMap = ({ location }) => {
    const map = useMap(); // Uzyskanie instancji mapy
    if (location) {
        map.flyTo(location, 13, { animate: true });
    }
    return null;
};

const MapComponent = () => {
    const [location, setLocation] = useState(null); // Przechowywanie lokalizacji użytkownika

    const handleClickStart = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(userLocation); // Ustawienie lokalizacji użytkownika
                },
                () => {
                    alert("Nie udało się uzyskać lokalizacji.");
                }
            );
        } else {
            alert("Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.");
        }
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    };

    return (
        <div>
            <button className="start" onClick={handleClickStart} style={{ marginBottom: "10px" }}>
                Start
            </button>
            <div id='map'>
                <MapContainer
                    center={[51.631805, 22.46528]} // Domyślne centrum mapy
                    zoom={13}
                    style={{ height: "700px", width: "100%" }}
                    fullscreenControl={true}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {location && (
                        <>
                            <Marker position={location}>
                                <Popup>
                                    Twoja lokalizacja: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                                </Popup>
                            </Marker>
                            <CenterMap location={location} />
                        </>
                    )}
                    <Recta />
                    <Polyline positions={prawaStr} pathOptions={polylineStyle} />
                    <Polyline positions={lewaStr} pathOptions={polylineStyle} />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;*/


'use client';
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { prawaStr, lewaStr, polylineStyle } from "../utils/Points";
import Recta from "./Recta";
import "leaflet.fullscreen/Control.FullScreen.css";
import 'leaflet/dist/leaflet.css';
import "leaflet.fullscreen";
import L from 'leaflet';

// Konfiguracja ikon Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});

// Komponent do centrowania mapy
const CenterMap = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 13, { animate: true });
        }
    }, [location, map]); // Aktualizacja za każdym razem, gdy zmieni się lokalizacja
    return null;
};

const MapComponent = () => {
    const [location, setLocation] = useState(null); // Aktualna pozycja użytkownika
    const [watchId, setWatchId] = useState(null); // ID procesu śledzenia

    const handleClickStart = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(userLocation); // Aktualizacja lokalizacji użytkownika
                },
                (error) => {
                    console.error("Błąd geolokalizacji:", error);
                    alert("Nie udało się uzyskać lokalizacji.");
                },
                {
                    enableHighAccuracy: true, // Wysoka dokładność lokalizacji
                    maximumAge: 0, // Brak buforowania danych
                    timeout: 10000, // Maksymalny czas oczekiwania na lokalizację
                }
            );
            setWatchId(id); // Przechowywanie ID procesu śledzenia
        } else {
            alert("Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.");
        }
    };

    const handleClickStop = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId); // Zatrzymanie śledzenia
            setWatchId(null); // Wyczyszczenie ID procesu
        }
    };

    return (
        <div>
            <button className="start" onClick={handleClickStart} style={{ marginRight: "10px" }}>
                Start
            </button>
            <button className="stop" onClick={handleClickStop}>
                Stop
            </button>
            <div id="map">
                <MapContainer
                    center={[51.631805, 22.46528]} // Domyślne centrum mapy
                    zoom={13}
                    style={{ height: "700px", width: "100%" }}
                    fullscreenControl={true}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {location && (
                        <>
                            <Marker position={location}>
                                <Popup>
                                    Twoja lokalizacja: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                                </Popup>
                            </Marker>
                            <CenterMap location={location} />
                        </>
                    )}
                    <Recta />
                    <Polyline positions={prawaStr} pathOptions={polylineStyle} />
                    <Polyline positions={lewaStr} pathOptions={polylineStyle} />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;



