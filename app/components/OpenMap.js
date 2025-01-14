"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet/dist/leaflet.css";


const OpenMap = () => {
  useEffect(() => {
    import("leaflet-fullscreen").then(() => {
      console.log("Wtyczka fullscreen załadowana");
    });
  }, []);

  return (
    <MapContainer
      center={[51.631600, 22.456937]} // [latitude, longitude]
      zoom={13}
      style={{ height: "470px", width: "100%" }}
      fullscreenControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.631600, 22.456937]}>
        <Popup>
          Budowa S19 <br /> Kock
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenMap;
