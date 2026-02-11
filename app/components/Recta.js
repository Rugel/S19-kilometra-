'use client';
import { Rectangle } from "react-leaflet";

export default function Recta({ bounds }) {
  if (!bounds) return null;

  // Opcje stylu dla prostokąta
  const rectangleStyle = {
    color: "blue",       // Kolor krawędzi
    weight: 2,           // Grubość krawędzi
    fillOpacity: 0,    // Przezroczystość wypełnienia
  };

  return (
    <Rectangle bounds={bounds} pathOptions={rectangleStyle} />
  )
}
