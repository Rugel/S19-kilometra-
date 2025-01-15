'use client';
import React from "react";
import 'leaflet/dist/leaflet.css';
import dynamic from "next/dynamic";
import StartButton from "./components/StartButton";
import OpenMap from "./components/OpenMap";
import MapsSelect from "./components/MapsSelect";
import GeoLink from "./components/GeoLink";
import Info from "./components/Info";
import Footer from "./components/Footer";
import Header from "./components/Header";


//const OpenMap = dynamic(() => import("./components/OpenMap"), { ssr: false });
export default function Home() {

    const main_func = () => {
        //tablice punktów lat i lon
        //const latlonP = [[52.2007456, 22.1184492], [52.1998836, 22.1249418], [52.1996298, 22.1268511], [52.1995428, 22.1275055], [52.1994599, 22.1281293], [52.1993589, 22.1288888], [52.1988388, 22.1327648], [52.1986125, 22.1343779], [52.1983405, 22.1361401], [52.1981399, 22.1373274], [52.1980288, 22.1379153], [52.1978862, 22.1386388], [52.197689, 22.1395547], [52.1974749, 22.1404566], [52.197287, 22.1411863], [52.1970476, 22.1420406], [52.1967565, 22.1429697], [52.1964268, 22.1439218], [52.1961457, 22.1446623], [52.195878, 22.1453243], [52.1955795, 22.1460046], [52.1952665, 22.1466613], [52.1949487, 22.1472878], [52.1945679, 22.1479882], [52.1941343, 22.148737], [52.1934315, 22.1498092], [52.1930782, 22.1502979], [52.1925984, 22.1509201], [52.1918976, 22.1517484], [52.1913275, 22.1523438], [52.1907375, 22.1529081], [52.1901385, 22.1534064], [52.189836, 22.1536457], [52.1895253, 22.1538778], [52.1891921, 22.1541099], [52.1888072, 22.1543517], [52.1880993, 22.1547624], [52.1875397, 22.1550271], [52.1873028, 22.155131], [52.1867524, 22.1553504], [52.1862283, 22.1555301], [52.1858968, 22.1556331], [52.1855904, 22.155716], [52.184943, 22.1558625], [52.184864, 22.1558807], [52.1846163, 22.15593], [52.1841732, 22.1559949], [52.1837202, 22.1560538], [52.1826075, 22.1561538], [52.1814927, 22.1562151], [52.1812445, 22.1562256], [52.1798992, 22.1562687], [52.1788548, 22.1563005], [52.1778425, 22.1563819], [52.1773734, 22.1564358], [52.1769845, 22.1564964], [52.1766476, 22.1565625], [52.1762327, 22.1566592], [52.1757863, 22.1567812], [52.1752929, 22.1569394], [52.1747522, 22.1571374], [52.1742559, 22.1573549], [52.1737469, 22.1576002], [52.1735021, 22.1577284], [52.1732558, 22.1578635], [52.1728212, 22.1581206], [52.1723946, 22.1583971], [52.171974, 22.1586892], [52.1715451, 22.159014], [52.1712064, 22.1592823], [52.1708786, 22.1595624], [52.1703172, 22.1600749], [52.1697383, 22.1606562], [52.1692468, 22.1612011], [52.1687678, 22.1617552], [52.1682906, 22.1623543], [52.1678828, 22.1629087], [52.167602, 22.1633142], [52.1670797, 22.1641034], [52.1668007, 22.1645618], [52.1664099, 22.1652462], [52.1658838, 22.1662305], [52.1653827, 22.1672499], [52.1650809, 22.1679419], [52.1647718, 22.1686904], [52.164518, 22.1693411], [52.1642479, 22.1700891], [52.163969, 22.170906], [52.1636992, 22.1717831], [52.1634045, 22.1728354], [52.1629791, 22.1745988], [52.1629415, 22.1747758], [52.1628015, 22.1754347], [52.1626764, 22.1760231], [52.1625101, 22.1768058], [52.1622707, 22.1779699], [52.1620138, 22.1791743], [52.1617615, 22.1803046], [52.161536, 22.1812652], [52.1612898, 22.182211], [52.1610981, 22.182921], [52.1609391, 22.1834602], [52.1607596, 22.184014], [52.1604076, 22.1850194], [52.1600123, 22.186013], [52.1595977, 22.1869481], [52.1591261, 22.1878914], [52.1584678, 22.1890444], [52.1581328, 22.1895869], [52.1577785, 22.1900993], [52.157487, 22.1905013], [52.1571926, 22.1908826], [52.156617, 22.191577], [52.1560212, 22.1922101], [52.1554053, 22.1927921], [52.1547809, 22.1933252], [52.1541381, 22.1938294], [52.1534923, 22.1943184], [52.1529964, 22.1946907], [52.1521167, 22.1953752], [52.1516774, 22.1957408], [52.1512601, 22.1961103], [52.1509072, 22.19645], [52.150564, 22.196805], [52.1499025, 22.197549], [52.1493611, 22.1982519], [52.1488308, 22.1989979], [52.1486154, 22.1993261], [52.1483592, 22.1997362], [52.1478927, 22.2005399], [52.1474673, 22.2013538], [52.1470705, 22.2021923], [52.1466966, 22.2030555], [52.1463411, 22.203965], [52.1460409, 22.2048525], [52.1460022, 22.2049667], [52.1458206, 22.2055426], [52.1456689, 22.2060235], [52.1456576, 22.2060594], [52.1453579, 22.2070924], [52.1450557, 22.2081582], [52.1445644, 22.209963], [52.1441307, 22.2116242], [52.1439206, 22.2125013], [52.1437, 22.2134791], [52.1434771, 22.2146056], [52.1432647, 22.2158474], [52.1430671, 22.2172132], [52.1428884, 22.2188682], [52.1428445, 22.219437], [52.1427946, 22.2201641], [52.1427444, 22.2211671], [52.1427255, 22.2219613], [52.1427123, 22.2226595], [52.1427108, 22.2227334], [52.1427138, 22.2237561], [52.1427284, 22.2247087], [52.1427548, 22.2256276], [52.1428146, 22.2274766], [52.1428389, 22.2281938], [52.1428683, 22.2290393], [52.1428798, 22.2293681], [52.1428832, 22.2294675], [52.1429258, 22.2306872], [52.1429308, 22.2308297], [52.1429628, 22.2317408], [52.1429992, 22.2328074], [52.1430264, 22.2337057], [52.1430631, 22.2354606], [52.1430736, 22.2363189], [52.1430799, 22.2371613], [52.1430764, 22.238166], [52.1430595, 22.2392798], [52.1430483, 22.2398701], [52.1430303, 22.2404977], [52.1430154, 22.2408942], [52.142988, 22.2414703], [52.1429242, 22.242523], [52.14284, 22.2436602], [52.1427998, 22.2441424], [52.1427562, 22.2446125], [52.1427352, 22.24482], [52.1427108, 22.2450242], [52.1426388, 22.2456329], [52.1425869, 22.2460478], [52.1425204, 22.2465656], [52.1424477, 22.24708], [52.1422216, 22.2485906], [52.1419309, 22.2503534]];

        const latlonL = [[52.1421223, 22.2503777], [52.1422669, 22.2495406], [52.1424958, 22.2481727], [52.1427109, 22.2467972], [52.1428563, 22.2457252], [52.1429328, 22.2450976], [52.1429583, 22.2448743], [52.1429922, 22.2445743], [52.1430518, 22.2439814], [52.1431037, 22.2434008], [52.1431563, 22.2427516], [52.1431935, 22.2422247], [52.1432447, 22.2413491], [52.1432637, 22.2409228], [52.1432781, 22.2405226], [52.1432781, 22.2405226], [52.1432973, 22.2398873], [52.14331, 22.2392963], [52.14331, 22.2392963], [52.1433142, 22.237998], [52.14331, 22.2373956], [52.143299, 22.2368115], [52.1432553, 22.235016], [52.1431752, 22.2326703], [52.1431433, 22.2317773], [52.1431134, 22.2309167], [52.1431049, 22.2306703], [52.1430962, 22.2304172], [52.1430835, 22.2300508], [52.1430659, 22.2296001], [52.1430585, 22.2293592], [52.1430461, 22.2289587], [52.1429991, 22.2276065], [52.142994, 22.2274659], [52.142994, 22.2274659], [52.1429624, 22.2266123], [52.1429376, 22.2252342], [52.1429207, 22.2241513], [52.1429193, 22.2233936], [52.142942, 22.2219638], [52.142962, 22.2213158], [52.1429813, 22.2207949], [52.1430308, 22.2199077], [52.1430808, 22.2192414], [52.1431558, 22.2183795], [52.1432934, 22.2172703], [52.1433518, 22.2167867], [52.1435183, 22.2156901], [52.1436663, 22.2148343], [52.1439679, 22.2132903], [52.1443176, 22.2117407], [52.144706, 22.2101893], [52.1451145, 22.2086504], [52.14545, 22.2074754], [52.1457764, 22.2064007], [52.1458518, 22.2061708], [52.1460286, 22.2056318], [52.1461561, 22.2052431], [52.1462357, 22.2050177], [52.1465457, 22.2041402], [52.1469048, 22.2032284], [52.1472753, 22.2023703], [52.1474803, 22.2019273], [52.1475862, 22.2017084], [52.1476903, 22.201508], [52.1479025, 22.2010866], [52.1481217, 22.2006869], [52.148378, 22.2002288], [52.148644, 22.1997996], [52.1489272, 22.199367], [52.1491964, 22.198967], [52.1496063, 22.1984054], [52.1500635, 22.1978194], [52.1506987, 22.197112], [52.151021, 22.1967765], [52.1513544, 22.1964525], [52.1517771, 22.1960751], [52.1522122, 22.1957092], [52.1526431, 22.1953657], [52.1530927, 22.1950263], [52.1535989, 22.1946494], [52.154205, 22.1941959], [52.1549115, 22.1936429], [52.1555459, 22.193102], [52.1561671, 22.1925155], [52.1567756, 22.1918565], [52.1570665, 22.1915198], [52.1573502, 22.1911687], [52.157624, 22.1908147], [52.1578895, 22.1904444], [52.1583445, 22.1897766], [52.1588171, 22.1890103], [52.1590396, 22.1886263], [52.1592637, 22.1882244], [52.159718, 22.1873218], [52.1600671, 22.1865511], [52.1603642, 22.1858324], [52.1606039, 22.1852217], [52.1609441, 22.1842489], [52.1611856, 22.1834976], [52.1613663, 22.182871], [52.1617053, 22.1815407], [52.1618561, 22.1808809], [52.1620042, 22.1802009], [52.1626878, 22.1768664], [52.162854, 22.1761227], [52.162984, 22.1755411], [52.1631298, 22.1748889], [52.163354, 22.1739588], [52.1635765, 22.1730783], [52.163912, 22.1719032], [52.1642698, 22.1707534], [52.164502, 22.1700827], [52.1647238, 22.1694726], [52.1651171, 22.1684893], [52.1655013, 22.1676022], [52.1660276, 22.1665034], [52.1665081, 22.1655986], [52.1669147, 22.1648877], [52.1673999, 22.1641037], [52.167779, 22.1635323], [52.1679466, 22.1632915], [52.168379, 22.1627062], [52.1688429, 22.1621098], [52.1693157, 22.1615649], [52.1698118, 22.1610138], [52.1704064, 22.1604107], [52.1710294, 22.1598369], [52.1714689, 22.159473], [52.1719103, 22.1591318], [52.1723337, 22.1588262], [52.1727631, 22.1585426], [52.1730083, 22.1583923], [52.1732628, 22.1582387], [52.1737271, 22.1579878], [52.1739966, 22.1578488], [52.1742334, 22.1577364], [52.1744209, 22.157652], [52.1745542, 22.1575978], [52.1748669, 22.1574668], [52.1751986, 22.1573415], [52.1754487, 22.1572495], [52.1757092, 22.1571658], [52.1759686, 22.1570986], [52.1762639, 22.1570127], [52.1768658, 22.156882], [52.1773698, 22.1567889], [52.1778538, 22.1567171], [52.1788844, 22.156621], [52.179849, 22.1565651], [52.1812498, 22.1565211], [52.1814927, 22.1565154], [52.1825519, 22.1564731], [52.1830937, 22.1564438], [52.184465, 22.156294], [52.1846402, 22.1562686], [52.1848857, 22.1562293], [52.1855037, 22.1560968], [52.1860299, 22.1559655], [52.1865069, 22.1558163], [52.187018, 22.1556277], [52.1872618, 22.1555364], [52.1878518, 22.1552701], [52.1884217, 22.1549812], [52.1890049, 22.1546253], [52.1895751, 22.1542477], [52.1901984, 22.1537777], [52.1908094, 22.1532598], [52.1913904, 22.1527078], [52.1919624, 22.1521152], [52.1926681, 22.151298], [52.193105, 22.150745], [52.1935295, 22.1501577], [52.1939581, 22.1495287], [52.1943292, 22.1489247], [52.194756, 22.1482051], [52.1951528, 22.1474652], [52.1954683, 22.1468394], [52.1957699, 22.1461944], [52.1960603, 22.1455376], [52.1962034, 22.1451916], [52.1963631, 22.1447937], [52.1965318, 22.1443501], [52.1967326, 22.1437992], [52.1970754, 22.1427744], [52.1973742, 22.1417624], [52.1975344, 22.1411766], [52.1976849, 22.1405809], [52.1979093, 22.1396151], [52.198095, 22.1387164], [52.198246, 22.1379338], [52.1983737, 22.1372082], [52.1985815, 22.1359135], [52.1988112, 22.1343343], [52.1989749, 22.1331518], [52.1990476, 22.1326067], [52.1995329, 22.1289324], [52.1996316, 22.1281944], [52.199716, 22.1275627], [52.199803, 22.1269122], [52.2000585, 22.125001], [52.2009253, 22.1185025]];

        latlonL.reverse();
        //dodanie mapy
        /*var map = L.map('map').setView([52.1713402, 22.1844079], 12);

        let sat = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })
        let str = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })
        let osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }); 

        osm.addTo(map);

        document.querySelectorAll('input[name="map"]').forEach((elem) => {
            elem.addEventListener("change", function (event) {
                var tLayer = event.target.value;
                if (tLayer === 'sat') { map.removeLayer(osm) && map.removeLayer(str); sat.addTo(map) };
                if (tLayer === 'str') { map.removeLayer(sat) && map.removeLayer(osm); str.addTo(map) };
                if (tLayer === 'osm') { map.removeLayer(sat) && map.removeLayer(str); <OpenMap /> };
            });
        });


        //funkcja licząca długość wycinka lini 
        let pointC: any;
        function lineLenth(latitude: any, longitude: any) {
            var point = L.latLng(latitude, longitude);
            var closestPointL = L.GeometryUtil.closest(map, pointsLineL, point);
            var closestPointP = L.GeometryUtil.closest(map, pointsLineP, point);
            let lngMid = (closestPointL.lng + closestPointP.lng) / 2;
            let latMid = (closestPointL.lat + closestPointP.lat) / 2;
            var start = turf.point(strLineL.geometry.coordinates[0]);
            var stop = turf.point([lngMid, latMid]);
            var subline = turf.lineSlice(start, stop, strLineL);
            var subline_length = turf.length(subline, { units: 'kilometers' });
            subline_length = subline_length * 1.0032;
            subline_length = subline_length.toFixed(3);
            subline_length = subline_length.toString().replace('.', ' + ');
            let popCon = `<a href=https://www.google.com/maps?q=${latMid},${lngMid} target=blank>km ${subline_length}</a>`;
            pointC ? map.removeLayer(pointC) : null;
            pointC = L.circleMarker([latMid, lngMid], { color: '#2dabab', radius: 10, fillOpacity: 1 }).addTo(map).bindPopup(`<b>${popCon}</b>`);
            return subline_length;
        }

        //dodanie prostokąta
        var bounds = [[52.2027456, 22.1144492], [52.1399348, 22.2543665]];
        L.rectangle(bounds, { color: 'blue', weight: 2, fillOpacity: 0 }).addTo(map);

        //dodanie markerów do mapy

        var office = L.marker([52.18811286436958, 22.147333469408157]).addTo(map);
        office.bindPopup("<a href='https://www.google.com/maps?q=52.18811286436958,22.147333469408157' target='blank'>Biuro Budowy A2<br/>odc.V POLAQUA</a>");

        var wmb = L.marker([52.176402, 22.155184]).addTo(map);
        wmb.bindPopup("<a href='https://www.google.com/maps?q=52.176402,22.155184' target='blank'>WMB POLAQUA</a>");

        var km12 = L.marker([(latlonL[latlonL.length - 1][0] + latlonP[latlonP.length - 1][0]) / 2, (latlonL[latlonL.length - 1][1] + latlonP[latlonP.length - 1][1]) / 2]).addTo(map);
        km12.bindPopup(`<a href='https://www.google.com/maps?q=${(latlonL[latlonL.length - 1][0] + latlonP[latlonP.length - 1][0]) / 2},${(latlonL[latlonL.length - 1][1] + latlonP[latlonP.length - 1][1]) / 2}' target='blank'>koniec odcinka<br/>km 12 + 489</a>`);

        var km0 = L.marker([(latlonL[0][0] + latlonP[0][0]) / 2, (latlonL[0][1] + latlonP[0][1]) / 2]).addTo(map);
        km0.bindPopup(`<a href='https://www.google.com/maps?q=${(latlonL[0][0] + latlonP[0][0]) / 2},${(latlonL[0][1] + latlonP[0][1]) / 2}' target='blank'>początek odcinka<br/>km 0 + 000</a>`);

        map.addControl(new L.Control.Fullscreen({
            title: {
                'false': 'widok pełnoekranowy',
                'true': 'wyjdź z widoku pełnoekranowego'
            }
        }));

        //utworzenie czerwonych lini na mapie

        var pointsLineP = L.polyline(latlonP, { color: 'red', weight: 2 }).addTo(map);

        for (el in latlonP) {
            latlonP[el].reverse();
        }
        var strLine = turf.lineString(latlonP);

        var pointsLineL = L.polyline(latlonL, { color: 'red', weight: 2 }).addTo(map);
        for (el in latlonL) {
            latlonL[el].reverse();
        }
        var strLineL = turf.lineString(latlonL);

        //funkcja zwracająca odległośś między dwoma punktami
        let distance = function (p1: { latitude: any; longitude: any; }, p2: { latitude: any; longitude: any; }) {
            const radius = 6371;
            const lat1 = p1.latitude * (Math.PI / 180);
            const lat2 = p2.latitude * (Math.PI / 180);
            const lon1 = p1.longitude * (Math.PI / 180);
            const lon2 = p2.longitude * (Math.PI / 180);
            const deltaLat = lat2 - lat1;
            const deltaLon = lon2 - lon1;
            const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return radius * c;
        }

        const result = document.getElementById('result');
        const button = document.getElementById('button');

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function error(err: { code: any; message: any; }) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            document.getElementById('info').innerHTML = `<br/>wystąpił błąd nr ${err.code} : <span style="color:red">${err.message}</span>`
        };

        let polyline: any;
        let deco: any;
        let circle: any;

        //lokalizacja 
        function start() {
            button.innerHTML = '<button class="stop" onclick="stop()">STOP</button>';
            if (navigator.geolocation) {
                id = navigator.geolocation.watchPosition(showPosition, error, options);
            } else {
                document.getElementById('info').innerHTML = '<br/>Twoja przeglądarka lub urządzenie nie obsługuje funkcji lokalizacji &#x1F62D'
            };


            //callback
            function showPosition(position: { coords: { latitude: any; longitude: any; accuracy: number; }; }) {
                let point1;
                let point2;
                let total = 0;
                let x = position.coords.latitude;
                let y = position.coords.longitude;
                let accu = position.coords.accuracy.toFixed(2);
                let subline_length;

                if (x <= latlonP[0][1] + 0.02 && x >= latlonP[latlonP.length - 1][1] - 0.02 && y >= latlonP[0][0] - 0.02 && y <= latlonP[latlonP.length - 1][0] + 0.02) {

                    subline_length = lineLenth(x, y);
                    document.getElementById('odczyt').innerHTML = subline_length;
                }
                else {
                    point1 = { latitude: latlonP[0][1], longitude: latlonP[0][0] };
                    point2 = { latitude: x, longitude: y };
                    total = distance(point1, point2).toFixed(3);
                    result.style.color = 'red';
                    result.style.fontSize = '1.3rem';
                    result.innerHTML = `odczyt spoza zakresu terenu budowy - odległość do punktu km 0 + 000 wynosi: <span style="color:blue">${total}</span> km`;
                    polyline ? map.removeLayer(polyline) : null;
                    polyline = L.polyline([[x, y], [(latlonL[0][1] + latlonP[0][1]) / 2, (latlonL[0][0] + latlonP[0][0]) / 2]], { color: "orange", weight: 1 }).addTo(map);
                    deco ? map.removeLayer(deco) : null;
                    deco = L.polylineDecorator(polyline, {
                        patterns: [
                            { offset: 70, repeat: 80, symbol: L.Symbol.arrowHead({ pixelSize: 20, pathOptions: { fillOpacity: .5, color: 'orange', weight: 0 } }) }
                        ]
                    }).addTo(map);

                }
                document.getElementById('dok').innerHTML = accu;
                map.flyTo([x, y], 18);
                circle ? map.removeLayer(circle) : null;
                circle = L.circleMarker([x, y], { color: '#2dabab', fillOpacity: .2 }).addTo(map).bindPopup(subline_length ? 'km ' + subline_length : total + ' km');

                //proj4
                // Zdefiniowanie systemów odniesienia współrzędnych
                proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
                proj4.defs("EPSG:2180", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs");

                // Funkcja przekształcająca współrzędne z GPS na PL-1992
                function gpsToPl1992(longitude: any, latitude: any) {
                    const gpsCoords = [longitude, latitude];
                    const pl1992Coords = proj4("EPSG:4326", "EPSG:2180", gpsCoords);
                    return pl1992Coords;
                }
                const pl1992Coords = gpsToPl1992(y, x);
                const x1992 = pl1992Coords[0];
                const y1992 = pl1992Coords[1];
                const geoLink = `<a href="https://mapy.geoportal.gov.pl/mobile/#zoom&x=${x1992}&y=${y1992}&minLevel=18&gpsPosition=true" target="blank">dodatkowe dane na mapie Geoportal</a>`;
                document.getElementById('link').innerHTML = geoLink;
            }
        };

        let id: number;

        function stop() {
            button.innerHTML = '<button class="start" onclick="start()">START</button>';
            navigator.geolocation.clearWatch(id);
        }

        //lokalizacja po kiknięciu
        map.on('click', function (e: { latlng: any; }) {
            var popLocation = e.latlng;
            let x = popLocation.lat;
            let y = popLocation.lng;
            if (x <= latlonP[0][1] + 0.02 && x >= latlonP[latlonP.length - 1][1] - 0.02 && y >= latlonP[0][0] - 0.02 && y <= latlonP[latlonP.length - 1][0] + 0.02) {
                let subline_length = lineLenth(x, y);
                var popup = L.popup()
                    .setLatLng(popLocation)
                    .setContent(`zapis w osi</br>km ${subline_length}`)
                    .openOn(map) */
    };

    return (
        <div id="contener">
            <div id="content">
                <Header />
                <StartButton />
                <MapsSelect />
                <GeoLink />
                <Info />
            </div>
            <div id='map'><OpenMap /></div>
            <Footer />
        </div>
    );
}
