'use client';
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

const CustomAttribution = () => {
  const map = useMap()

  useEffect(() => {
    const attribution = L.control({
      position: 'topright'
    })

    attribution.onAdd = () => {
      const div = L.DomUtil.create('div', 'custom-attribution')
      div.innerHTML = '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet </a>&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      return div
    }

    attribution.addTo(map)

    return () => {
      attribution.remove()
    }
  }, [map])

  return null
}

export default CustomAttribution;