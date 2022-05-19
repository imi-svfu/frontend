import React from 'react';
import MapContent from './MapContent';
import MenuBar from './MenuBar';
import LevelBar from './LevelBar';
import { Provider } from 'react-redux';
import store from '../store';

const Main = () => {
  const [clicked, setClicked] = React.useState(false)
  return (
    <Provider store={ store }>
      <div>
        <div onClick={() => { setClicked(!clicked) }}>
          <MenuBar/>
        </div>
        <div onClick={() => { setClicked(!clicked) }}>
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
          <MapContent/>
        </div>
      </div>
    </Provider>
  );
}

export default Main;
