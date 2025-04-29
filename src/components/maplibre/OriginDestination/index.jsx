import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { getUserLocation } from '../../../utils/getUserLocation';

const OriginDestination = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const initialCoords = {
    lng: 51.337566,
    lat: 35.699410
  };
  const [lng, setLng] = useState(initialCoords.lng);
  const [lat, setLat] = useState(initialCoords.lat);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=u9sVUFs9EediXSIWuJ4H	',
      center: [lng, lat],
      zoom: 10,
    });

    markerRef.current = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const currentLocationHandler = () => {
    getUserLocation().then((location) => {
      if (location) {
        markerRef.current.setLngLat([location.lat, location.lng]);
        mapRef.current.flyTo({
          center: [location.lat, location.lng],
          zoom: 10,
          speed: 1,
        });

        setLng(location.lng);
        setLat(location.lat);
      }
    })
  };


  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      <button
        onClick={currentLocationHandler}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        رفتن به موقعیت من
      </button>
    </div>
  );
};

export default OriginDestination;
