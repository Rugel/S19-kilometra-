import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  CircleMarker,
} from "react-leaflet";
import { prawaStr, lewaStr, polylineStyle } from "../utils/Points";
import Recta from "./Recta";
import { lineLenth } from "../utils/lineLenth";
import CustomAttribution from "./CustomAttribution";
import L from "leaflet";

const office = L.icon({
  iconUrl: "/images/office.png",
  iconAnchor: [42, 42],
});

const ClickHandler = ({ setResult }) => {
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

    map.on("click", handleMapClick);
    return () => map.off("click", handleMapClick);
  }, [map, setResult]);

  return null;
};

const LineLengthCalculator = ({ location, setResult }) => {
  const map = useMap();
  useEffect(() => {
    if (location && map) {
      try {
        const result = lineLenth(map, location.lat, location.lng);
        setResult(result);
      } catch (error) {
        console.error("Błąd obliczeń:", error);
      }
    }
  }, [location, map, setResult]);
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

const MapInner = ({ location, setResult, mapType }) => {
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

  const { url, maxZoom } = getTileLayerConfig();

  return (
    <MapContainer
      center={[51.631805, 22.46528]}
      zoom={12}
      style={{ height: "60vh", width: "100%" }}
      fullscreenControl={true}
    >
      <TileLayer url={url} maxZoom={maxZoom} attributionControl={false} />
      <CustomAttribution />
      <ClickHandler setResult={setResult} />
      {location && (
        <>
          <CircleMarker
            center={[location.lat, location.lng]}
            radius={10}
            pathOptions={{ color: "#2dabab" }}
          >
            <Popup>
              twoja lokalizacja:<br />
              lat: {location.lat}<br />
              lng: {location.lng}
            </Popup>
          </CircleMarker>
          <CenterMap location={location} />
          <LineLengthCalculator location={location} setResult={setResult} />
        </>
      )}
      <Recta />
      <Polyline positions={prawaStr} pathOptions={polylineStyle} />
      <Polyline positions={lewaStr} pathOptions={polylineStyle} />
      <Marker position={[51.6391316, 22.445226]} icon={office}>
        <Popup>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=51.6391316,22.4452260"
            target="_blank"
            rel="noopener noreferrer"
          >
            POLAQUA - biuro budowy
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapInner;
