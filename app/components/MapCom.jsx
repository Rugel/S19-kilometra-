'use client';
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, CircleMarker } from "react-leaflet";
import { prawaStr, lewaStr, polylineStyle, srodekStr } from "../utils/PointsRadzynKock";
import { prawaStr as prawaStrKock, lewaStr as lewaStrKock, polylineStyle as polylineStyleKock } from "../utils/Points";
import Recta from "./Recta";
import MapsSelect from "./MapsSelect";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import L from "leaflet";
import { lineLenth } from "../utils/lineLenth";
import GeoLink from './GeoLink';

// konfiguracja ikon
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    alt: 'Znacznik lokalizacji'
});

export const office = typeof window !== 'undefined' ? L.icon({
    iconUrl: '/images/office.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    alt: 'POLAQUA - biuro budowy'
}) : null;

export const TextIcon = (text) =>
    typeof window !== 'undefined' ? L.divIcon({
        className: 'custom-marker-container',
        html: `<div class="map-marker-pin">${text}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
    }) : null;

const ClickHandler = ({ activePrawaStr, activeLewaStr, offset, activeSrodekStr }) => {
    const map = useMap();

    useEffect(() => {
        const handleMapClick = (e) => {
            const { lat, lng } = e.latlng;
            try {
                const subline_length = lineLenth(map, lat, lng, activePrawaStr, activeLewaStr, offset, activeSrodekStr).length;
                L.popup()
                    .setLatLng([lat, lng])
                    .setContent(`km ${subline_length}`)
                    .openOn(map);
            } catch (error) {
                console.error("Błąd obliczeń:", error);
            }
        };

        map.on('click', handleMapClick);
        return () => map.off('click', handleMapClick);
    }, [map, activePrawaStr, activeLewaStr, offset, activeSrodekStr]);

    return null;
};

const LineLengthCalculator = ({ latitude, longitude, setResult, activePrawaStr, activeLewaStr, offset, activeSrodekStr }) => {
    const map = useMap();
    useEffect(() => {
        if (map && latitude && longitude) {
            try {
                const result = lineLenth(map, latitude, longitude, activePrawaStr, activeLewaStr, offset, activeSrodekStr);
                setResult(result);
            } catch (error) {
                console.error("Błąd obliczeń:", error);
            }
        }
    }, [map, latitude, longitude, setResult, activePrawaStr, activeLewaStr, offset, activeSrodekStr]);
    return null;
};

const CenterMap = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.flyTo(location, 17, { animate: true });
        }
    }, [location, map]);

    return null;
};

const FitBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    }, [bounds, map]);
    return null;
};

const MapComponent = ({
    activePrawaStr,
    activeLewaStr,
    activePolylineStyle,
    initialCenter = [51.631805, 22.46528],
    initialZoom = 12,
    section = "kock",
    offset = 0
}) => {
    // Fallback logic inside component to handle default values if props are missing
    // But since defaults were removed from props destructuring (see below), they need handling
    // Actually, I'll restore defaults in the logic below or keep props simple

    // Determine which points to use if not provided via props (for fallback/default section)
    const pStr = activePrawaStr || (section === "radzyn" ? prawaStr : prawaStrKock);
    const lStr = activeLewaStr || (section === "radzyn" ? lewaStr : lewaStrKock);
    const pStyle = activePolylineStyle || (section === "radzyn" ? polylineStyle : polylineStyleKock);

    const activeSrodekStr = section === "radzyn" ? srodekStr : undefined;

    const [location, setLocation] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [result, setResult] = useState(null);
    const [mapType, setMapType] = useState("osm");

    const bounds = section === "kock"
        ? [[51.59723, 22.44884], [51.66638, 22.48172]]
        : [[51.6554, 22.4609], [51.8055, 22.6328]];

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

    const getTileLayerConfig = () => {
        switch (mapType) {
            case "sat":
                return {
                    url: "https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
                    maxZoom: 20,
                };
            case "str":
                return {
                    url: "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                    maxZoom: 20,
                };
            default:
                return {
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    maxZoom: 19,
                };
        }
    };

    // TextIcon logic moved to exports

    return (
        <div className="map-component-wrapper">
            <div className="content-column">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <MapsSelect onChange={(value) => setMapType(value)} />
                </div>

                <div className="link">
                    {location ? (
                        <GeoLink location={location} />
                    ) : (
                        <a
                            href="https://mapy.geoportal.gov.pl/mobile/#fullExtent&1737922676017"
                            target="blank"
                        >
                            Geoportal - mapa z uzbrojeniem terenu
                        </a>
                    )}
                </div>

                <div id="info">
                    {result ? (
                        <p>
                            KM: <span className="data">{result.length}</span>
                        </p>
                    ) : (
                        <p>
                            KM:{" "}
                            <span className="data" style={{ color: "var(--text-light)", fontWeight: 400 }}>
                                brak danych
                            </span>
                        </p>
                    )}
                </div>

                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <button
                        className="tap"
                        onClick={() => {
                            if (watchId) handleClickStop();
                            else handleClickStart();
                        }}
                        style={{
                            backgroundColor: watchId ? "var(--danger-color)" : "var(--success-color)",
                            color: "white"
                        }}
                    >
                        {watchId ? "STOP" : "START"}
                    </button>
                </div>
            </div>

            <div className="map-column">
                <div id="map">
                    <MapContainer
                        center={initialCenter}
                        zoom={initialZoom}
                        style={{ height: "100%", width: "100%", minHeight: "60vh" }}
                        fullscreenControl={true}
                    >
                        <ClickHandler activePrawaStr={pStr} activeLewaStr={lStr} offset={offset} activeSrodekStr={activeSrodekStr} />
                        {(() => {
                            const { url, maxZoom } = getTileLayerConfig();
                            return (
                                <>
                                    <TileLayer
                                        url={url}
                                        maxZoom={maxZoom}
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                </>
                            );
                        })()}

                        {location && (
                            <>
                                <CircleMarker
                                    center={[location.lat, location.lng]}
                                    radius={10}
                                    pathOptions={{ color: "#2dabab" }}
                                >
                                    <Popup>
                                        twoja lokalizacja:
                                        <br />
                                        lat: {location.lat}
                                        <br />
                                        lng: {location.lng}
                                    </Popup>
                                </CircleMarker>
                                <CenterMap location={location} />
                                <LineLengthCalculator
                                    latitude={location.lat}
                                    longitude={location.lng}
                                    setResult={setResult}
                                    activePrawaStr={pStr}
                                    activeLewaStr={lStr}
                                    offset={offset}
                                    activeSrodekStr={activeSrodekStr}
                                />
                            </>
                        )}

                        <FitBounds bounds={bounds} />
                        <Recta bounds={bounds} />
                        <Polyline positions={pStr} pathOptions={pStyle} />
                        <Polyline positions={lStr} pathOptions={pStyle} />

                        {section === "kock" && (
                            <>
                                <Marker position={[51.6391316, 22.4452260]} icon={office} alt="POLAQUA - biuro budowy">
                                    <Popup>
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=51.6391316,22.4452260"
                                            target="blank"
                                            rel="noopener noreferrer"
                                        >
                                            POLAQUA - biuro budowy
                                        </a>
                                    </Popup>
                                </Marker>
                                <Marker position={[51.658809, 22.463883]} icon={TextIcon('WD-1')} alt="Obiekt WD-1" />
                                <Marker position={[51.650344, 22.463754]} icon={TextIcon('PZM-1A')} alt="Obiekt PZM-1A" />
                                <Marker position={[51.640301, 22.460756]} icon={TextIcon('PZM-1B')} alt="Obiekt PZM-1B" />
                                <Marker position={[51.637621, 22.459265]} icon={TextIcon('PZM-1C')} alt="Obiekt PZM-1C" />
                                <Marker position={[51.637262, 22.459037]} icon={TextIcon('WD-2')} alt="Obiekt WD-2" />
                                <Marker position={[51.635451, 22.458071]} icon={TextIcon('PZM-2A')} alt="Obiekt PZM-2A" />
                                <Marker position={[51.630562, 22.456661]} icon={TextIcon('MS-3')} alt="Obiekt MS-3" />
                                <Marker position={[51.621980, 22.458954]} icon={TextIcon('PZM-3A')} alt="Obiekt PZM-3A" />
                                <Marker position={[51.619527, 22.460383]} icon={TextIcon('WD-4')} alt="Obiekt WD-4" />
                                <Marker position={[51.612672, 22.464592]} icon={TextIcon('MS-5')} alt="Obiekt MS-5" />
                                <Marker position={[51.609821, 22.466218]} icon={TextIcon('WS-5A')} alt="Obiekt WS-5A" />
                                <Marker position={[51.606656, 22.468223]} icon={TextIcon('WS-5B')} alt="Obiekt WS-5B" />
                                <Marker position={[51.604772, 22.469382]} icon={TextIcon('WD-6')} alt="Obiekt WD-6" />
                                <Marker position={[51.659413, 22.467526]} icon={TextIcon('R-1')} alt="Obiekt R-1" />
                                <Marker position={[51.655238, 22.456768]} icon={TextIcon('R-2')} alt="Obiekt R-2" />
                                <Marker position={[51.604345, 22.467462]} icon={TextIcon('R-3')} alt="Obiekt R-3" />
                            </>
                        )}

                        {section === "radzyn" && (
                            <>
                                <Marker position={[51.7954344, 22.6233649]} icon={TextIcon('Początek')} alt="Początek odcinka Radzyń" />
                                <Marker position={[51.6654, 22.4703]} icon={TextIcon('Koniec')} alt="Koniec odcinka / Wejście w obwodnicę" />
                                <Marker position={[51.7407647, 22.5497941]} icon={TextIcon('WMB Polaqua')} alt="WMB Polaqua">
                                    <Popup>
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=51.7407647,22.5497941"
                                            target="blank"
                                            rel="noopener noreferrer"
                                        >
                                            WMB Polaqua
                                        </a>
                                    </Popup>
                                </Marker>
                            </>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};


export default MapComponent;
