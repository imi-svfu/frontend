import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, GeoJSON, Marker, useMap, Popup
} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { useWindowDimensions, searchResult, data, rooms } from '../consts/functions';
import { useSelector, useDispatch } from 'react-redux';
import { male } from '../consts/variables'
import { auth } from '../store/tasks'

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
    fillColor: '#fff',
    weight: 4,
    opacity: 2,
  }
};

// Вызов функции при приближении или отдалении карты

const MapSimple = props => {
  const data2 = useSelector((state) => state.data.value);
  const [map, setMap] = useState(null);
  const sizes = useWindowDimensions();
  return (
    <MapContainer
      style={{
        height: sizes.height,
        backgroundColor: 'white',
      }}
      ref={setMap}
      center={props.data.center}
      zoom={19}
      minZoom={16}
      maxZoom={21}
    >
      <TileLayer
        maxZoom={21}
        attribution='copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=e65VFhNaAEo0l5tGguVF"
      />
      {searchResult(data2, map, styles.result)}
      {data(props.data.places, map)}
      {rooms([props.data.floors.kfen[auth.getState().level]], map)}
    </MapContainer>
  );
}

export default MapSimple;
