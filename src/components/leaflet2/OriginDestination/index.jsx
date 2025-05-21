import { useState, useEffect, useRef } from 'react';
import './styles.css'
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
// import marker1 from "../../../assets/images/marker-icon-2x.png"
// import marker2 from "../../../assets/images/marker-icon.png"
import { getUserLocation } from '../../../utils/getUserLocation';

import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: marker1,
//   iconUrl: marker2,
// });
const customIcon = L.divIcon({
  html: '<div class="custom-marker"></div>',
  className: 'custom-circle-icon',
  iconSize: [10, 10],
  iconAnchor: [5, 5]
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

function OriginDestination() {
  const [position, setPosition] = useState([35.69974293407641, 51.33803844451905]);

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
            icon={customIcon}
            position={position}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
              },
              click: () => {
                console.log('marker clicked')
              },
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
