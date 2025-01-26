import proj4 from 'proj4';

export default function GeoLink({ location }) {
    // Sprawdzenie, czy lokalizacja jest dostępna
    if (!location) {
        return <p>Nie można wygenerować linku: brak lokalizacji.</p>;
    }

    // Zdefiniowanie systemów odniesienia współrzędnych
    proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
    proj4.defs(
        "EPSG:2180",
        "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs"
    );

    // Funkcja przekształcająca współrzędne z GPS na PL-1992
    function gpsToPl1992(longitude, latitude) {
        const gpsCoords = [longitude, latitude];
        const pl1992Coords = proj4("EPSG:4326", "EPSG:2180", gpsCoords);
        return pl1992Coords;
    }

    // Przekształcenie współrzędnych
    const [x1992, y1992] = gpsToPl1992(location.lng, location.lat);

    // Generowanie linku do Geoportalu
    const geoportalUrl = `https://mapy.geoportal.gov.pl/mobile/#x=${x1992.toFixed(2)}&y=${y1992.toFixed(2)}&zoomLevel=18&gpsPosition=true`;
    return (
        <p>
            <a href={geoportalUrl} target="blank">
                dodatkowe dane w serwisie Geoportal
            </a>
        </p>
    );
}