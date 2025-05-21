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
        altLineOptions: { styles: [{ color: "#ff33cc", weight: 9 }] },
        draggableWaypoints: false,
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        show: false,
        // waypoints?: Waypoint[] | LatLng[] | undefined;
        // router?: IRouter | undefined;
        // plan?: Plan | undefined;
        // geocoder?: any; // IGeocorder is from other library;
        // fitSelectedRoutes?: "smart" | boolean | undefined;
        // lineOptions?: LineOptions | undefined;
        // routeLine?: ((route: IRoute, options: LineOptions) => Line) | undefined;
        // autoRoute?: boolean | undefined;
        // routeWhileDragging?: boolean | undefined;
        // routeDragInterval?: number | undefined;
        // waypointMode?: "connect" | "snap" | undefined;
        // useZoomParameter?: boolean | undefined;
        // showAlternatives?: boolean | undefined;
        // altLineOptions?: LineOptions | undefined;
        // addWaypoints?: boolean | undefined;
        // defaultErrorHandler?: ((error: any) => void) | undefined;
      }).addTo(map);
      routingControlRef.current.on("routesfound", (e) => { console.log("routesfound", e); })
      routingControlRef.current.on("routingerror", (e) => { console.log("routingerror", e); })
      routingControlRef.current.on("waypointschanged", (e) => { console.log("waypointschanged", e); })
      routingControlRef.current.on("routingstart", (e) => { console.log("routingstart", e); })
      routingControlRef.current.on("routesselected", (e) => { console.log("routesselected", e); })
      routingControlRef.current.on("routeselected", (e) => { console.log("routeselected", e); })
      routingControlRef.current.on("lineclicked", (e) => { console.log("lineclicked", e); })
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
