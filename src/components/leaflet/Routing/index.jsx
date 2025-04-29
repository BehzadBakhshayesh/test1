import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import marker1 from "../../../assets/images/marker-icon-2x.png"
import marker2 from "../../..//assets/images/marker-icon.png"
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useEffect, useState } from 'react';
import './styles.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker1,
    iconUrl: marker2,
});

function RoutingMap({ start, end }) {
    const [origin, setOrigin] = useState(start)
    useEffect(() => {
        const watchID = navigator.geolocation.watchPosition((position) => {
            setOrigin([position.coords.latitude, position.coords.longitude]);
        }, () => {

        }, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000,
        });
    }, [])
    return (
        <div className='App'>
            <div className='map-container'>
                <MapContainer center={origin} zoom={18} style={{ height: '100%', width: '100%' }} keepBuffer={20} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        errorTileUrl="https://upload.wikimedia.org/wikipedia/commons/2/26/White_tile.png"
                        maxZoom={18}
                        minZoom={3}
                    />

                    <Marker position={origin} zoom={18}>
                        <Popup>شروع</Popup>
                    </Marker>

                    <Marker position={end}>
                        <Popup>پایان</Popup>
                    </Marker>

                    <RoutingMachine start={origin} end={end} />
                </MapContainer>
            </div>
        </div>
    )
}

export default RoutingMap;
