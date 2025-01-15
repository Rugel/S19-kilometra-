export default function MapsSelect()
{
    return(
        <div>
            <fieldset>
                    <legend className="view"><i>wybór mapy</i></legend>
                    <div className="view">
                        <input type="radio" id="map1" name="map" value="osm" defaultChecked />
                        <label htmlFor="map1">OpenStreetMap </label>
                        <input type="radio" id="map2" name="map" value="sat" />
                        <label htmlFor="map2">GoogleSatellite </label>
                        <input type="radio" id="map3" name="map" value="str" />
                        <label htmlFor="map3">GoogleMaps</label>
                    </div>
                </fieldset>
        </div>
    )
}