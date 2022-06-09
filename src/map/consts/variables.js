import eatery from '../images/icons/rest.png'
import drug from '../images/icons/drug.png'
import elevator from '../images/icons/elevator.png'
import stairs from '../images/icons/marker.png'
import hanger from '../images/icons/hanger.png'
import WC from '../images/icons/WC.png'
import shop from '../images/icons/shop.png'

import svfu from '../geojson/svfu.json'
import guk from '../geojson/guk.json'
import departments from '../geojson/deparments.json'
import ks from '../geojson/ks.json'
import floor1 from '../geojson/kfenfloors/floor1.json'
import floor2 from '../geojson/kfenfloors/floor2.json'
import floor3 from '../geojson/kfenfloors/floor3.json'
import floor4 from '../geojson/kfenfloors/floor4.json'
import floor5 from '../geojson/kfenfloors/floor5.json'

export {
  shop,
  stairs, 
  eatery, 
  drug, 
  WC,
  elevator,
  hanger
};

export const navBarItems = [
  {
    name: 'Аудитории',
    color: '#D0ECF8'
  },
  {
    name: 'Услуги',
    color: '#B58DE9'
  },
  {
    name: 'Магазин',
    color: '#99E98D'
  },
  {
    name: 'Туалет',
    color: '#7EA3CF'
  },
  {
    name: 'Лифт',
    color: '#F8EC86'
  },
  {
    name: 'Лестница',
    color: '#FFB775'
  },
  {
    name: 'Буфет, столовая',
    color: '#F9AEF1'
  },
  {
    name: 'Гардероб',
    color: '#B18000'
  }
]
    
export const key = 'AIzaSyC3xUnuzP1RN_XKqaGPMRvz3BWBV7zR_nk';
export const color2 = '#E8DCC6';

export const center = {
  lat: 62.01671935259849,
  lng: 129.704032757926,
};
export const markerpos = {
  lat: 62.01648597850309,
  lng: 129.70535251493942,
};

export const places = [
  svfu, guk, departments, ks
]

export const floors = {
  kfen: [floor1, floor2, floor3, floor4, floor5]
}
