import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import './styles.css'
import L from 'leaflet';
import marker1 from "../../../assets/images/marker-icon-2x.png"
import marker2 from "../../../assets/images/marker-icon.png"
import { getUserLocation } from '../../../utils/getUserLocation';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker1,
  iconUrl: marker2,
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

function OriginDestination() {
  const [position, setPosition] = useState([35.699410, 51.337566]);

  // ===============================================
  const [circleVisible, setCircleVisible] = useState(false);
  const circleRef = useRef();


  const currentLocationHandler = () => {
    getUserLocation().then((location) => {
      if (location) {
        setPosition([location.lat, location.lng]);
        setCircleVisible(true);
      }
    })
  };

  return (
    <div className='App'>
      <button className='current-loc' onClick={currentLocationHandler}>موقعیت فعلی</button>
      <div className='map-container'>
        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={position} zoom={16} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {circleVisible && (
            <Circle
              center={position}
              radius={300}
              pathOptions={{
                stroke: "",
                color: "blue",
                // weight: "",
                // opacity: "",
                // lineCap: "",
                // lineJoin: "",
                // dashArray: "",
                // dashOffset: "",
                // fill: "",
                // fillColor: "",
                // fillOpacity: "",
                // fillRule: "",
                // renderer: "",
                // className: "",
              }}
              ref={circleRef}
            />
          )}

          <Marker
            position={position}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
              }
            }}
          >
            <Popup>
              موقعیت فعلی شما
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default OriginDestination;
