import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';

import XYZ from 'ol/source/XYZ';
import { getUserLocation } from '../../../utils/getUserLocation';

const INITIAL_CENTER = [51.337566, 35.699410];

const OriginDestination = () => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [vectorSource] = useState(new VectorSource());

    useEffect(() => {
        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    // source: new OSM(),
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                        // url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    }),
                }),
                new VectorLayer({
                    source: vectorSource,
                }),
            ],
            view: new View({
                center: fromLonLat(INITIAL_CENTER),
                zoom: 16,
            }),
        });

        setMap(initialMap);
    }, [vectorSource]);



    const currentLocationHandler = () => {
        getUserLocation().then((location) => {
            if (location) {

                const coords = fromLonLat([location.lat, location.lng]);
                vectorSource.clear();
                const userFeature = new Feature({
                    geometry: new Point(coords),
                });
                userFeature.setStyle(
                    new Style({
                        image: new Icon({
                            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
                            scale: 1,
                        }),
                    })
                );
                vectorSource.addFeature(userFeature);
                map.getView().animate({ center: coords, zoom: 14 });

            }
        })
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div ref={mapRef} style={{ height: '800px', width: '100%' }} />
            <button onClick={currentLocationHandler} style={{ marginTop: '10px' }}>
                نمایش موقعیت من
            </button>
        </div>
    );
}

export default OriginDestination