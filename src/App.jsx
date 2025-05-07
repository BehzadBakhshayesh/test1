
import { useState } from 'react';
import OriginDestination from './components/leaflet/OriginDestination';
import RoutingMap from './components/leaflet/Routing';
// import OriginDestination from "./components/maplibre/OriginDestination"
// import OriginDestination from "./components/mapir/OriginDestination"
// import OriginDestination from "./components/openlayers/OriginDestination"



function App() {
  const [activeTab, setActiveTab] = useState('originDestination');
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="tabs" style={{ width: '100%', display: "flex", gap: "10px", }}>
        <button style={{ flex: "1", height: "50px" }} onClick={() => setActiveTab('originDestination')}>موقعیت فعلی</button>
        <button style={{ flex: "1", height: "50px" }} onClick={() => setActiveTab('routingMap')}>مسیر یابی</button>
      </div>
      {activeTab === 'originDestination' ? (
        <OriginDestination />
      ) : (
        <RoutingMap start={[35.705145, 51.399099]} end={[35.699410, 51.337566]} />
      )}
    </div>
  )
}

export default App
