
// import OriginDestination from './components/leaflet/OriginDestination';
import RoutingMap from './components/leaflet/Routing';
// import OriginDestination from "./components/maplibre/OriginDestination"
// import OriginDestination from "./components/mapir/OriginDestination"
// import OriginDestination from "./components/openlayers/OriginDestination"



function App() {


  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <OriginDestination /> */}
      <RoutingMap start={[35.705145, 51.399099]} end={[35.699410, 51.337566]} />
    </div>
  )
}

export default App
