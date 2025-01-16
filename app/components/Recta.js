'use client';
import { Rectangle } from "react-leaflet";

export default function Recta() {
    // Zdefiniowanie granic prostokąta
    const rectangleBounds = [
      [51.59723, 22.44884], // Lewy dolny róg
      [51.66638, 22.48172], // Prawy górny róg
    ];
  
    // Opcje stylu dla prostokąta
    const rectangleStyle = {
      color: "blue",       // Kolor krawędzi
      weight: 2,           // Grubość krawędzi
      fillOpacity: 0,    // Przezroczystość wypełnienia
    };
  return(
    <Rectangle bounds={rectangleBounds} pathOptions={rectangleStyle} />
  )
  }