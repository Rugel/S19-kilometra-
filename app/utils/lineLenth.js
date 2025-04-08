import L from 'leaflet';
import 'leaflet-geometryutil';
import { point, lineSlice, length, lineString } from "@turf/turf";
import { prawaStr, lewaStr } from './Points';

let pointC;
//const fix = 0.998980502102;
const fix = 1.002;

// Funkcja obliczająca długość linii
export function lineLenth(map, latitude, longitude) {
    const poi = L.latLng(latitude, longitude);
    const closestPointL = L.GeometryUtil.closest(map, lewaStr, poi);
    const closestPointP = L.GeometryUtil.closest(map, prawaStr, poi);
    const lngMid = (closestPointL.lng + closestPointP.lng) / 2;
    const latMid = (closestPointL.lat + closestPointP.lat) / 2;
    const revlewaStr = lewaStr.map(subArray => [...subArray].reverse());
    const stringRewLewaStr = lineString(revlewaStr);
    const start = point([22.4703451, 51.6654197]);
    const stop = point([lngMid, latMid]);
    const subline = lineSlice(start, stop, stringRewLewaStr);
    let sublineLength = length(subline, { units: "kilometers" }) * fix;
    sublineLength = sublineLength.toFixed(3);
    sublineLength = sublineLength.toString().replace('.', ' + ');
    let popCon = `<a href=https://www.google.com/maps?q=${latMid},${lngMid} target=blank>km ${sublineLength}</a>`;
    if(pointC) { map.removeLayer(pointC); pointC = null};
    pointC = L.circleMarker([latMid, lngMid], { color: '#2dabab', radius: 10, fillOpacity: 1 }).addTo(map).bindPopup(`<b>${popCon}</b>`);
    return {
        length: sublineLength
    };
}