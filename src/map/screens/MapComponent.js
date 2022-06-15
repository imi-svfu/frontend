import React from 'react';

import MapSimple from './MapSimple';
import NavigationBar from './NavBar';

import { setSchedule } from '../store/tasks';
import { center, markerpos, places, floors } from '../consts/variables';
import { useWindowDimensions } from '../consts/functions'

import { useDispatch } from 'react-redux';

const MapComponent = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (dispatch)
      fetch("https://kit-imi.info/api/timetable/events/")
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(setSchedule(result))
        },
      )
      .catch(error => console.error('timeout exceeded'))
  }, [dispatch])
  
  const sizes = useWindowDimensions();
  return (
    <div>
      <NavigationBar sizes={ sizes }/>
      <div style={{ 
        zIndex: 1, 
        position: 'fixed', 
        width: '100%', 
        height: '100%', 
        top: '60px', 
        left: '0' 
      }}>
        <MapSimple data={{
          center,
          marker: markerpos,
          places: places,
          floors: floors,
          sizes: sizes,
        }}
        />
      </div>
    </div>
  );
}

export default MapComponent;
