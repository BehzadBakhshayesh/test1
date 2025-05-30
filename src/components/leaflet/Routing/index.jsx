import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './styles.css';

const customIcon_start = L.divIcon({
    html: '<div class="start-marker"></div>',
    className: 'start-circle-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
const customIcon_end = L.divIcon({
    html: '<div class="end-marker"></div>',
    className: 'end-circle-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

delete L.Icon.Default.prototype._getIconUrl

function RoutingMap({ start, end }) {
    const [origin, setOrigin] = useState(start);
    const [followUser, setFollowUser] = useState(true);

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
                    if (followUser && mapRef.current) {
                        mapRef.current.setView(newOrigin, mapRef.current.getZoom(), { animate: true });
                    }
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
    }, [followUser]);

    const handleResetZoom = () => {
        mapRef.current.setView(origin, 17, { animate: true });
        setFollowUser(true);
    };

    return (
        <div className="routing-comopnent">
            <div className="map-container">
                <MapContainer
                    center={origin}
                    zoom={17}
                    style={{ height: '100%', width: '100%' }}
                    whenReady={({ target: mapInstance }) => {
                        mapRef.current = mapInstance;
                        if (!mapInstance._movestartListenerAdded) {
                            mapInstance.on('movestart', () => {
                                setFollowUser(false);
                            });
                            // mapInstance.on('move', () => {
                            //     setFollowUser(false);
                            // });
                            mapInstance._movestartListenerAdded = true;
                        }
                    }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={origin} ref={markerRef} icon={customIcon_start}>
                        <Popup>موقعیت کنونی</Popup>
                    </Marker>
                    <Marker position={end} icon={customIcon_end}>
                        <Popup>میدان آزادی</Popup>
                    </Marker>
                    <RoutingMachine start={origin} end={end} />
                </MapContainer>
                <button className="reset-zoom-btn" onClick={handleResetZoom}>
                    بازگشت به موقعیت فعلی
                </button>
            </div>
        </div >
    );
}

export default RoutingMap;
