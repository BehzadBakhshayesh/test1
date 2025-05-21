
import { useState } from 'react';
import OriginDestination from './components/leaflet/OriginDestination';
import RoutingMap from './components/leaflet/Routing';
import RoutingMap2 from './components/leaflet2/Routing';
import "./App.css"



function App() {
  const [activeTab, setActiveTab] = useState('originDestination');
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="tabs-container" >
        <button style={{ flex: "1", height: "100%" }} onClick={() => setActiveTab('originDestination')}>موقعیت فعلی</button>
        <button style={{ flex: "1", height: "100%" }} onClick={() => setActiveTab('routingMap1')}>1مسیر یابی</button>
        <button style={{ flex: "1", height: "100%" }} onClick={() => setActiveTab('routingMap2')}>2مسیر یابی</button>
      </div>
      <div className='maps-container'>
        {activeTab === 'originDestination' && (<OriginDestination />)}
        {activeTab === 'routingMap1' && <RoutingMap start={[35.705145, 51.399099]} end={[35.69974293407641, 51.33803844451905]} />}
        {activeTab === 'routingMap2' && <RoutingMap2 start={[35.705145, 51.399099]} end={[35.69974293407641, 51.33803844451905]} />}
      </div>
    </div>
  )
}

export default App
