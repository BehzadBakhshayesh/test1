import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
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

const MyMap = ({ origin, setOrigin, end, followUser, setFollowUser, }) => {
    const markerRef = useRef(null);
    const map = useMapEvents({
        movestart() {
            setFollowUser(false);
        },
        load(e) {
            console.log({ load: e });

        }
    })

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
                    if (followUser && map) {
                        map.setView(newOrigin, map.getZoom(), { animate: true });
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

    return <>
        <Marker position={origin} ref={markerRef} icon={customIcon_start}>
            <Popup>موقعیت کنونی</Popup>
        </Marker>
        <Marker position={end} icon={customIcon_end}>
            <Popup>میدان آزادی</Popup>
        </Marker>
        <RoutingMachine origin={origin} end={end} />
    </>
}

const CurrentBtn = ({ origin, setFollowUser }) => {
    const map = useMap();
    const handleResetZoom = () => {
        map.setView(origin, 17, { animate: true });
        setFollowUser(true);
    };
    return (
        <button className="reset-zoom-btn" onClick={handleResetZoom}>
            بازگشت به موقعیت فعلی
        </button>
    )
}
function RoutingMap({ start, end }) {
    const [followUser, setFollowUser] = useState(true);
    const [origin, setOrigin] = useState(start);

    console.log(followUser);

    return (
        <div className="routing-comopnent">
            <div className="map-container">
                <MapContainer
                    center={origin}
                    zoom={17}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MyMap origin={origin} setOrigin={setOrigin} end={end} followUser={followUser} setFollowUser={setFollowUser} />
                    <CurrentBtn setFollowUser={setFollowUser} origin={origin} />
                </MapContainer>

            </div>
        </div >
    );
}

export default RoutingMap;
