import React, { useEffect } from 'react';
import MenuBar from './MenuBar';
import LevelBar from './LevelBar';
import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import MapSimple from './MapSimple';
import { center, markerpos, places, floors } from '../consts/variables';

const MapComponent = () => {
  console.log('xd')
  return (
    <Provider store={ store }>
      <div>
        <div>
          <MenuBar/>
        </div>
        <div>
          <LevelBar />
        </div>
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
          }}
          />
        </div>
      </div>
    </Provider>
  );
}

export default MapComponent;
