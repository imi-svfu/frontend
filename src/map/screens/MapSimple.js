import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { searchResult, data, rooms, Markers, getFeatureLocation, getRoomLocation, CheckoutDetails, dayOfWeek } from '../consts/functions';
import { ExitIcon } from '../consts/variables'
import { useDispatch, useSelector } from 'react-redux';
import { setSchedule } from '../store/tasks';

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
  const data2 = storeData.result
  const move = storeData.move
  const level = storeData.level;
  const sizes = props.data.sizes;
  CheckoutDetails()
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
      {data(props.data.places)}
      {rooms([props.data.floors.kfen[level]])}
      {Markers(getFeatureLocation(props.data.places))}
      {Markers(getRoomLocation(props.data.floors.kfen[level]))}
    </MapContainer>
  );
}

export default MapSimple;
