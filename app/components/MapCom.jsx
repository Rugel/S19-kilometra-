'use client';

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { prawaStr, lewaStr, polylineStyle } from "../utils/Points";
import Recta from "./Recta";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import L from "leaflet";
import { lineLenth } from "../utils/lineLenth";

// Konfiguracja ikon Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});
// Komponent do obliczania długości linii
const LineLengthCalculator = ({ latitude, longitude, setResult }) => {
    const map = useMap(); // Uzyskaj dostęp do instancji mapy
    useEffect(() => {
        if (map && latitude && longitude) {
            try {
                const result = lineLenth(map, latitude, longitude); // Oblicz długość linii
                setResult(result); // Przekaż wynik do komponentu nadrzędnego
            } catch (error) {
                console.error("Błąd obliczeń:", error);
            }
        }
    }, [map, latitude, longitude, setResult]);
    return null;
};

const MapComponent = () => {
    const [location, setLocation] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [result, setResult] = useState(null); // Stan przechowujący wynik obliczeń

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
            <div>
                {result ? (
                    <div id='info'>
                        <p>KM: <span className="data">{result.length}</span></p>
                    </div>
                ) : (
                    <p>KM: <span className="data">brak danych</span></p>
                )}
            </div>
            <button className="start" onClick={handleClickStart} style={{ marginRight: "10px" }}>
                Start
            </button>
            <button className="stop" onClick={handleClickStop}>
                Stop
            </button>
            <div id="map">
                <MapContainer
                    center={[51.631805, 22.46528]}
                    zoom={12}
                    style={{ height: "60vh", width: "100%" }}
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
                            <LineLengthCalculator
                                latitude={location.lat}
                                longitude={location.lng}
                                setResult={setResult}
                            />
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

const CenterMap = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 18, { animate: true });
        }
    }, [location, map]);
    return null;
};
export default MapComponent;

