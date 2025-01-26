export default function MapsSelect({ onChange }) {
    return (
        <div className="maps">
            <fieldset>
                <legend className="view">
                    wybór mapy
                </legend>
                <div className="view">
                    <input
                        type="radio"
                        id="map1"
                        name="map"
                        value="osm"
                        defaultChecked
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label htmlFor="map1">OpenStreetMap</label>
                    <input
                        type="radio"
                        id="map2"
                        name="map"
                        value="sat"
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label htmlFor="map2">Google Satellite</label>
                    <input
                        type="radio"
                        id="map3"
                        name="map"
                        value="str"
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label htmlFor="map3">Google Maps</label>
                </div>
            </fieldset>
        </div>
    );
}
