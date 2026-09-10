'use client';
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { buildLegendGroups, dashCssStyle } from "../utils/legend";

// Kontrolka-legenda osadzona nad mapą (klasa .map-legend z globals.css).
// Przycisk "Legenda" zwija/rozwija panel opisujący kolorowe linie i znaczniki.
const MapLegend = ({ section = "kock", routeColor = "red", wayTypes = [], customLines = [], customMarkers = [] }) => {
    const map = useMap();

    useEffect(() => {
        const groups = buildLegendGroups({ routeColor, section, wayTypes, customLines, customMarkers });

        const swatch = (item) => {
            if (item.kind === "pill") {
                return `<span class="map-legend-marker map-legend-marker--pill" aria-hidden="true">WD</span>`;
            }
            if (item.kind === "office") {
                return `<span class="map-legend-marker map-legend-marker--office" aria-hidden="true"><img src="/images/office.png" alt="" /></span>`;
            }
            if (item.kind === "pin") {
                return `<span class="map-legend-marker map-legend-marker--pin" aria-hidden="true"></span>`;
            }
            if (item.kind === "gps") {
                return `<span class="map-legend-marker map-legend-marker--gps" aria-hidden="true"></span>`;
            }
            // Próbka wiernie oddaje wygląd linii na mapie: grubość + wzór
            // (ciągła / przerywana / kropkowana).
            if (item.dashArray || item.dashed) {
                const cssStyle = item.dashArray ? dashCssStyle(item.dashArray) : (item.dotted ? "dotted" : "dashed");
                const thickness = Number.isFinite(item.weight)
                    ? Math.max(2, Math.min(8, Math.round(item.weight)))
                    : 4;
                return `<span class="map-legend-line" style="border-top:${thickness}px ${cssStyle} ${item.color}" aria-hidden="true"></span>`;
            }
            const thickness = Number.isFinite(item.weight)
                ? Math.max(2, Math.min(8, Math.round(item.weight)))
                : 4;
            return `<span class="map-legend-swatch" style="background-color:${item.color};height:${thickness}px" aria-hidden="true"></span>`;
        };

        const html = `
            <button type="button" class="map-legend-toggle" aria-expanded="false">Legenda</button>
            <div class="map-legend-panel" hidden>
                ${groups
                    .map(
                        (g) => `
                    <div class="map-legend-group">
                        <div class="map-legend-title">${g.title}</div>
                        <ul>
                            ${g.items.map((item) => `<li>${swatch(item)}<span>${item.label}</span></li>`).join("")}
                        </ul>
                    </div>`
                    )
                    .join("")}
            </div>`;

        const LegendControl = L.Control.extend({
            onAdd() {
                const container = L.DomUtil.create("div", "map-legend leaflet-bar");
                container.innerHTML = html;
                const button = container.querySelector(".map-legend-toggle");
                const panel = container.querySelector(".map-legend-panel");

                L.DomEvent.disableClickPropagation(container);
                L.DomEvent.disableScrollPropagation(container);

                button.addEventListener("click", (e) => {
                    L.DomEvent.stopPropagation(e);
                    const isHidden = panel.hasAttribute("hidden");
                    if (isHidden) {
                        panel.removeAttribute("hidden");
                    } else {
                        panel.setAttribute("hidden", "");
                    }
                    button.setAttribute("aria-expanded", String(isHidden));
                    button.classList.toggle("map-legend-toggle--open", isHidden);
                });

                return container;
            },
        });

        const control = new LegendControl({ position: "topright" });
        control.addTo(map);

        return () => {
            control.remove();
        };
    }, [map, section, routeColor, wayTypes, customLines, customMarkers]);

    return null;
};

export default MapLegend;
