import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './styles.css';

import customIcon from "../../../assets/images/marker-icon.png";


const customIcon_start = L.divIcon({
    html: '<div class="start-marker"></div>',
    className: 'start-circle-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});
const customIcon_end = L.divIcon({
    html: '<div class="end-marker"></div>',
    className: 'end-circle-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

delete L.Icon.Default.prototype._getIconUrl;


function RoutingMap({ start, end }) {
    const [origin, setOrigin] = useState(start);
    const markerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const watchID = navigator.geolocation.watchPosition(
            (position) => {
                const newOrigin = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];
                setOrigin(newOrigin);

                if (markerRef.current) {
                    markerRef.current.setLatLng(newOrigin);
                    mapRef.current.setView(newOrigin, mapRef.current.getZoom(), { animate: true, });
                }

            },
            (err) => { console.error(err) },
            {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchID);
    }, []);

    return (
        <div className="App">
            <div className="map-container">
                <MapContainer
                    center={origin}
                    zoom={18}
                    style={{ height: '100%', width: '100%' }}
                    whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution=""

                    />
                    <Marker position={origin} ref={markerRef} icon={customIcon_start}>
                        <Popup>شروع</Popup>
                    </Marker>

                    <Marker position={end} icon={customIcon_end}>
                        <Popup>پایان</Popup>
                    </Marker>

                    <RoutingMachine start={origin} end={end} />
                </MapContainer>
            </div>
        </div>
    );
}

export default RoutingMap;
