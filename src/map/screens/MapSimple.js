import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, GeoJSON, Marker, useMap, Popup
} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useWindowDimensions, searchResult, data, rooms } from '../consts/functions';
import { useSelector, useDispatch } from 'react-redux';
import { auth, setItem } from '../store/tasks'
import { male } from '../consts/variables'

const skater = new L.Icon({
  iconUrl: male,
  iconSize: [120, 100]
});

const styles = {
  red: {
    fillColor: '#EC526D'
  },
  departments: {
    weight: 1,
    fillColor: '#ffffff',
    fillOpacity: 1,
    opacity: 1,
  },
  result: {
    color: '#5FD888',
    weight: 4,
    opacity: 2,
  }
};

// Вызов функции при приближении или отдалении карты
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
    });
  }, [map]);

  return position === null 
    ? null 
    : (
        <Marker position={position} icon={skater}>
          <Popup>
            You are here. <br />
            Map bbox: <br />
          </Popup>
        </Marker>
      );
}

const MapSimple = props => {
  const data2 = useSelector((state) => state.data.value);
  const cameramove = auth.getState().cameramove;
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(19);
  const level = props.data.bruh
  const sizes = useWindowDimensions();
  auth.dispatch({ type: 'setMove', cameramove: false });
  console.log(auth.getState())
  const GetZoomValue = () => {
    if (map) {
      map.on('zoomend', function() {
        setZoom(map.getZoom())
      });
    }
  }

  return (
    <MapContainer
      style={{
        height: sizes.height,
        backgroundColor: 'white',
      }}
      center={props.data.center}
      zoom={19}
      minZoom={16}
      maxZoom={21}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=e65VFhNaAEo0l5tGguVF"
      />
      {searchResult(data2, map, styles.result, cameramove)}
      {data(props.data.places)}
      {zoom > 17 ? rooms([props.data.floors.kfen[auth.getState().level]]) : undefined}
      {GetZoomValue()}
      <Marker
        position={props.data.center}
      >
        <Popup>
          Center of the map
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapSimple;
