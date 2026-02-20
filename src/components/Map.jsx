import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CITIES } from '../config/gameData';

export function MapComponent({ currentCityName, visitedCities, travelAnimation }) {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const markersRef = useRef({});
    const flightPathRef = useRef(null);
    const planeMarkerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        // Initialize map
        const map = L.map(containerRef.current, {
            center: [20, 0],
            zoom: 2,
            minZoom: 1,
            maxZoom: 10,
            zoomControl: false,
            attributionControl: false,
            dragging: true,
            scrollWheelZoom: false,
            zoomAnimation: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Update Markers
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Clear existing
        Object.values(markersRef.current).forEach(m => map.removeLayer(m));
        markersRef.current = {};

        Object.entries(CITIES).forEach(([key, city]) => {
            const isCurrent = currentCityName === key;
            const isVisited = visitedCities.includes(key);

            const color = isCurrent ? '#22d3ee' : isVisited ? '#10b981' : city.color;

            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="
          width: ${isCurrent ? '20px' : '12px'};
          height: ${isCurrent ? '20px' : '12px'};
          background-color: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 ${isCurrent ? '15px' : '5px'} ${color};
          transition: all 0.3s ease;
          opacity: 0.9;
          ${isCurrent ? 'animation: pulse-ring 2s infinite;' : ''}
        "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const marker = L.marker(city.coords, { icon: customIcon });

            marker.bindPopup(`
        <div style="text-align: center; min-width: 120px; font-family: 'Inter', sans-serif;">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #fff;">${city.name}</div>
          <div style="font-size: 11px; color: #94a3b8;">${city.country}</div>
        </div>
      `, {
                className: 'custom-popup'
            });

            marker.addTo(map);
            markersRef.current[key] = marker;
        });

        // Add styles for the popup dynamically
        if (!document.getElementById('leaflet-custom-styles')) {
            const style = document.createElement('style');
            style.id = 'leaflet-custom-styles';
            style.innerHTML = `
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid #334155;
          border-radius: 8px;
          color: #fff;
          backdrop-filter: blur(8px);
        }
        .custom-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid #334155;
        }
      `;
            document.head.appendChild(style);
        }

        // Adjust map view to fit all markers perfectly
        const bounds = L.latLngBounds(Object.values(CITIES).map(c => c.coords));
        map.fitBounds(bounds, { padding: [30, 30] });

    }, [currentCityName, visitedCities]);

    // Handle Animation
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !travelAnimation.active) return;

        const fromCity = CITIES[travelAnimation.from];
        const toCity = CITIES[travelAnimation.to];

        if (!fromCity || !toCity) return;

        const from = fromCity.coords;
        const to = toCity.coords;
        const progress = travelAnimation.progress;

        const lat = from[0] + (to[0] - from[0]) * progress;
        const lng = from[1] + (to[1] - from[1]) * progress;

        // Calculate visual angle using projected map coordinates
        const p1 = map.project(from);
        const p2 = map.project(to);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        if (!flightPathRef.current) {
            flightPathRef.current = L.polyline([from, to], {
                color: '#22d3ee',
                weight: 3,
                dashArray: '10, 10',
                opacity: 0.8
            }).addTo(map);
        }

        // Beautiful SVG airplane pointing exactly UP by default, so +90deg makes it turn perfectly
        const svgPlane = `
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#22d3ee" style="filter: drop-shadow(0 0 8px rgba(34,211,238,0.8));">
                <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
            </svg>
        `;

        const planeIcon = L.divIcon({
            className: 'plane-div-icon',
            html: `<div style="transform: rotate(${angle + 90}deg); transform-origin: center; transition: transform 0.1s; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">${svgPlane}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        if (!planeMarkerRef.current) {
            planeMarkerRef.current = L.marker([lat, lng], { icon: planeIcon, zIndexOffset: 1000 }).addTo(map);
        } else {
            planeMarkerRef.current.setLatLng([lat, lng]);
            planeMarkerRef.current.setIcon(planeIcon);
        }

    }, [travelAnimation]);

    // Cleanup flight animation when it finishes
    useEffect(() => {
        if (!travelAnimation.active && flightPathRef.current) {
            mapRef.current?.removeLayer(flightPathRef.current);
            flightPathRef.current = null;
            if (planeMarkerRef.current) {
                mapRef.current?.removeLayer(planeMarkerRef.current);
                planeMarkerRef.current = null;
            }
        }
    }, [travelAnimation.active]);

    // Invalidate map size after mount so Leaflet measures the container correctly
    useEffect(() => {
        if (!mapRef.current || !containerRef.current) return;
        const observer = new ResizeObserver(() => {
            mapRef.current?.invalidateSize();
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100%', minHeight: '180px', zIndex: 1 }}
        />
    );
}
