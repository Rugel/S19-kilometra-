'use client';
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, CircleMarker, textIcon } from "react-leaflet";
import { prawaStr, lewaStr, polylineStyle } from "../utils/Points";
import Recta from "./Recta";
import MapsSelect from "./MapsSelect";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import L from "leaflet";
import { lineLenth } from "../utils/lineLenth";
import GeoLink from './GeoLink';
import CustomAttribution from './CustomAttribution';

// Konfiguracja ikon Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});

const office = L.icon({ iconUrl: '/images/office.png', iconAnchor: [42, 42], });

const ClickHandler = () => {
    const map = useMap();

    useEffect(() => {
        const handleMapClick = (e) => {
            const { lat, lng } = e.latlng;
            try {
                const subline_length = lineLenth(map, lat, lng).length;
                L.popup()
                    .setLatLng([lat, lng])
                    .setContent(`km ${subline_length}`)
                    .openOn(map);
            } catch (error) {
                console.error("Błąd obliczeń:", error);
            }
        };

        map.on('click', handleMapClick);
        return () => {
            map.off('click', handleMapClick);
        };
    }, [map]);
    return null;
};

const LineLengthCalculator = ({ latitude, longitude, setResult }) => {
    const map = useMap();
    useEffect(() => {
        if (map && latitude && longitude) {
            try {
                const result = lineLenth(map, latitude, longitude);
                setResult(result);
            } catch (error) {
                console.error("Błąd obliczeń:", error);
            }
        }
    }, [map, latitude, longitude, setResult]);
    return null;
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

    const TextIcon = (text) => {
        return L.divIcon({
            html: `<div class="textIcon">${text}</div>`
        })
    }


    return (
        <div>
            <div className="link">
                {location ?
                    <GeoLink location={location} /> :
                    <a href="https://mapy.geoportal.gov.pl/mobile/#fullExtent&1737922676017" target="blank">
                        dodatkowe dane w serwisie Geoportal
                    </a>
                }
            </div>
            <MapsSelect onChange={(value) => setMapType(value)} />
            <div id="info">
                {result ? (
                    <p>
                        KM: <span className="data">{result.length}</span>
                    </p>
                ) : (
                    <p>
                        KM: <span className="data" style={{ fontWeight: 100, color: "grey" }}>
                            brak danych
                        </span>
                    </p>
                )}
            </div>
            <button
                className="tap"
                onClick={() => {
                    if (watchId) {
                        handleClickStop();
                    } else {
                        handleClickStart();
                    }
                }}
                style={{
                    marginRight: "10px",
                    color: "white",
                    backgroundColor: watchId ? "red" : "green",
                    transition: "background-color 0.3s",
                }}
            >
                {watchId ? "STOP" : "START"}
            </button>


            <div id="map">
                <MapContainer
                    center={[51.631805, 22.46528]}
                    zoom={12}
                    style={{ height: "62vh", width: "100%" }}
                    fullscreenControl={true}
                >
                    <ClickHandler />
                    {(() => {
                        const { url, maxZoom } = getTileLayerConfig();
                        return (
                            <>  <TileLayer
                                url={url}
                                maxZoom={maxZoom}
                                attributionControl={false}
                                attributionPosition="topright"
                            />
                                <CustomAttribution />
                            </>
                        );
                    })()}
                    {location && (
                        <>
                            <CircleMarker
                                center={[location.lat, location.lng]}
                                radius={10}
                                pathOptions={{
                                    color: "#2dabab",
                                }}
                            >
                                <Popup>
                                    twoja lokalizacja:<br />
                                    lat: {location.lat}<br />
                                    lng: {location.lng}
                                </Popup>
                            </CircleMarker>
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
                    <Marker position={[51.6391316, 22.4452260]} icon={office}>
                        <Popup>
                            <a
                                href='https://www.google.com/maps/dir/?api=1&destination=51.6391316,22.4452260'
                                target='blank'
                                rel="noopener noreferrer"
                            >
                                POLAQUA - biuro budowy
                            </a>
                        </Popup>
                    </Marker>
                    <Marker position={[51.658809, 22.463883]} icon={TextIcon('WD-1')} ></Marker>
                    <Marker position={[51.650344, 22.463754]} icon={TextIcon('PZM-1A')} ></Marker>
                    <Marker position={[51.640301, 22.460756]} icon={TextIcon('PZM-1B')} ></Marker>
                    <Marker position={[51.637621, 22.459265]} icon={TextIcon('PZM-1C')} ></Marker>
                    <Marker position={[51.637262, 22.459037]} icon={TextIcon('WD-2')} ></Marker>
                    <Marker position={[51.635451, 22.458071]} icon={TextIcon('PZM-2A')} ></Marker>
                    <Marker position={[51.630562, 22.456661]} icon={TextIcon('MS-3')} ></Marker>
                    <Marker position={[51.621980, 22.458954]} icon={TextIcon('PZM-3A')} ></Marker>
                    <Marker position={[51.619527, 22.460383]} icon={TextIcon('WD-4')} ></Marker>
                    <Marker position={[51.612672, 22.464592]} icon={TextIcon('MS-5')} ></Marker>
                    <Marker position={[51.609821, 22.466218]} icon={TextIcon('WS-5A')} ></Marker>
                    <Marker position={[51.606656, 22.468223]} icon={TextIcon('WS-5B')} ></Marker>
                    <Marker position={[51.604772, 22.469382]} icon={TextIcon('WD-6')} ></Marker>
                    <Marker position={[51.659413, 22.467526]} icon={TextIcon('R-1')} ></Marker>
                    <Marker position={[51.655238, 22.456768]} icon={TextIcon('R-2')} ></Marker>
                    <Marker position={[51.604345, 22.467462]} icon={TextIcon('R-3')} ></Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;