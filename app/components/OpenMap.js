"use client";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import Recta from "./Recta";
import {prawaStr} from "../utils/Points";
import { polylineStyle } from "../utils/Points";

export default function OpenMap() {
  return (
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
    </MapContainer>
  );
}
