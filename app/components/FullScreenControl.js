'use client';
import { useEffect } from "react";
import { useMap } from "react-leaflet";
//import "leaflet-fullscreen/dist/leaflet.fullscreen.js";
//import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";

const FullScreenControl = () => {
    useEffect(() => {
        import("leaflet-fullscreen").then(() => {
          console.log("Wtyczka fullscreen załadowana");
        });
      }, []);
  const map = useMap();

  useEffect(() => {
    if (map) {
      L.control.fullscreen().addTo(map); // Dodanie kontrolki fullscreen do mapy
    }
  }, [map]);

  return null;
};

export default FullScreenControl;
