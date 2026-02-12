import L from 'leaflet';
import 'leaflet-geometryutil';
import { point, lineSlice, length, lineString } from "@turf/turf";
import { prawaStr, lewaStr } from './Points';

let pointC;

const fix = 1.002;

// Funkcja obliczająca długość linii
export function lineLenth(map, latitude, longitude, activePrawaStr, activeLewaStr, offset = 0, activeCenterStr) {
    const pStr = activePrawaStr || prawaStr;
    const lStr = activeLewaStr || lewaStr;

    const poi = L.latLng(latitude, longitude);
    const closestPointL = L.GeometryUtil.closest(map, lStr, poi);
    const closestPointP = L.GeometryUtil.closest(map, pStr, poi);
    const lngMid = (closestPointL.lng + closestPointP.lng) / 2;
    const latMid = (closestPointL.lat + closestPointP.lat) / 2;

    const pathStr = activeCenterStr || lStr;
    const revPathStr = pathStr.map(subArray => [...subArray].reverse());
    const stringRewPathStr = lineString(revPathStr);

    // Używamy pierwszego punktu z wybranej ścieżki jako początku kilometraża
    const startCoord = [pathStr[0][1], pathStr[0][0]]; // [lng, lat] dla Turf
    const start = point(startCoord);
    const stop = point([lngMid, latMid]);

    const correctionFactor = 0.9995145463914841;
    const subline = lineSlice(start, stop, stringRewPathStr);
    let sublineLength = ((length(subline, { units: "kilometers" }) * fix) * correctionFactor) + offset;
    sublineLength = sublineLength.toFixed(3);
    sublineLength = sublineLength.toString().replace('.', ' + ');

    let popCon = `<a href=https://www.google.com/maps?q=${latMid},${lngMid} target=blank>km ${sublineLength}</a>`;

    if (pointC) {
        try {
            map.removeLayer(pointC);
        } catch (e) {
            console.warn("Could not remove layer", e);
        }
        pointC = null;
    };

    pointC = L.circleMarker([latMid, lngMid], { color: '#2dabab', radius: 10, fillOpacity: 1 }).addTo(map).bindPopup(`<b>${popCon}</b>`);

    return {
        length: sublineLength
    };
}
