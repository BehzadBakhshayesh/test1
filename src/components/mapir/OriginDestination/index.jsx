import { useEffect, useRef, useState } from 'react';
import Mapir from "mapir-react-component";
import { getUserLocation } from '../../../utils/getUserLocation';
const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        'x-api-key': import.meta.env.VITE_MAP_API_KEY_MAPIR,
        'Mapir-SDK': 'reactjs'
      },
      credentials: 'include'
    }

  }
});;
const OriginDestination = () => {



  // const currentLocationHandler = () => {
  //   getUserLocation().then((location) => {
  //     if (location) {
  //       markerRef.current.setLngLat([location.lat, location.lng]);
  //       mapRef.current.flyTo({
  //         center: [location.lat, location.lng],
  //         zoom: 10,
  //         speed: 1,
  //       });

  //       setLng(location.lng);
  //       setLat(location.lat);
  //     }
  //   })
  // };

  console.log({ Map });

  return (
    <div style={{ width: '100%', height: '80px', }}>
      <Mapir
        userLocation
        center={[35.699674, 51.337847]}
        minZoom={[11]}
        scrollZoom={false}
        hash={true}
        Map={Map}
        interactive={true}
      >
        {/* <Mapir.ZoomControl position={"top-left"} /> */}
        {/* <Mapir.Marker coordinates={[35.699674, 51.337847]} anchor="bottom" /> */}
      </Mapir>


    </div>
  );
};

export default OriginDestination;
