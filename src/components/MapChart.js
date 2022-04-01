import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import * as chartStyles from "./MapChart.module.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const markers = [

  { markerOffset: 15, name: "Arizona", coordinates: [-111.0937, 34.0489] },
  { markerOffset: 15, name: "California", coordinates: [-119.4179, 37.9582] },
  { markerOffset: 15, name: "Colorado", coordinates: [-105.35, 39.1130] },
  { markerOffset: 15, name: "Delaware", coordinates: [-75.3042, 39.0000] },
  { markerOffset: 15, name: "Florida", coordinates: [-82.2736, 28.4053] },
  { markerOffset: 15, name: "Illinois", coordinates: [-89.3013, 39.4421] },
  { markerOffset: 15, name: "Maryland", coordinates: [-75.2120, 37.0313] },
  { markerOffset: 15, name: "Massachusetts", coordinates: [-71.5531, 42.2238] },
  { markerOffset: 15, name: "Missouri", coordinates: [-91.8318, 37.9643] },
  { markerOffset: 15, name: "New Jersey", coordinates: [-73.4400, 39.2849] },
  { markerOffset: 15, name: "New York", coordinates: [-76.1474, 43.0481] },
  { markerOffset: 15, name: "Ohio", coordinates: [-82.9071, 40.4173] },
  { markerOffset: 15, name: "Pennsylvania", coordinates: [-77.1945, 41.2033] },
  { markerOffset: 15, name: "Utah", coordinates: [-111.3820, 39.1829] },

];


const isActive = (state) => {
    if(!state) return false;
    
    return markers.find(item => item.name === state);
}

const MapChart = ({setActiveGeo, activeGeo}) => {

  return (
    <ComposableMap
      projection="geoAlbersUsa"
    >
      <Geographies data-tip="" geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .map(geo => (
              <Geography
                className={`${isActive(geo.properties?.name) ? chartStyles.activeGeo : chartStyles.nonActiveGeo} ${chartStyles.singleGeo}}`}
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                    isActive(geo.properties?.name) ? setActiveGeo(geo.properties?.name) :  setActiveGeo(null);
                  }}
                  onMouseLeave={() => {
                    setActiveGeo(null);
                  }}
              />
            ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            className={`${activeGeo === name ? chartStyles.locationMarkerActive : chartStyles.locationMarker}`}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {""}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;