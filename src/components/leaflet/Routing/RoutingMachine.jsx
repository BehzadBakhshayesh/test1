import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function RoutingMachine({ start, end }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    if (!routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
        lineOptions: { styles: [{ color: "#1d7874", weight: 9 }] },
        draggableWaypoints: false,
        addWaypoints: false,
        routeWhileDragging: false,
        show: false,
      }).addTo(map);
    } else {
      routingControlRef.current.setWaypoints([
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ]);
    }
  }, [start, end, map]);

  useEffect(() => {
    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map]);

  return null;
}

export default RoutingMachine;
