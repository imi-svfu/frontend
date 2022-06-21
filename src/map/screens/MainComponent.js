import React from 'react';
import { Provider } from 'react-redux';
import MapComponent from './MapComponent';

import '../fonts/fonts.css'
import store from '../store';

const MainComponent = () => {
  return (
    <Provider store={ store }>
      <MapComponent/>
    </Provider>
  );
}

export default MainComponent;
