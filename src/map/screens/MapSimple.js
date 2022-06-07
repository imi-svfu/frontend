import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, GeoJSON, Marker, useMap, Popup
} from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { searchResult, data, rooms, Markers, getFeatureLocation, getRoomLocation } from '../consts/functions';
import { useDispatch, useSelector } from 'react-redux';
import { male } from '../consts/variables'

const skater = new L.Icon({
  iconUrl: male,
  iconSize: [120, 100]
});

const styles = {
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
  const storeData = useSelector((state) => state.data);
  const [map, setMap] = useState(null);
  const dispatch = useDispatch()
  const data2 = storeData.result
  const move = storeData.move
  const level = useSelector((state) => state.data.level);
  const sizes = props.data.sizes;
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
      zoomControl={false}
    >
      <TileLayer
        maxZoom={21}
        attribution='copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=e65VFhNaAEo0l5tGguVF"
      />
      {searchResult(data2, map, styles.result, move)}
      {data(props.data.places, map)}
      {rooms([props.data.floors.kfen[level]], map)}
      {Markers(getFeatureLocation(props.data.places))}
      {Markers(getRoomLocation(props.data.floors.kfen[level]))}
    </MapContainer>
  );
}

export default MapSimple;
