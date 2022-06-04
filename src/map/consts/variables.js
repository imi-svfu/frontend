import background from '../images/bg2-2.png';
import studgorod from '../images/studgorod.jpg';
import logo from '../images/logo2.png';
import imilogo from '../images/logo.png';
import searchlogo from '../images/icons/search.png'
import eat from '../images/icons/eat.png'
import apteka from '../images/icons/apteka.png'
import product from '../images/icons/product.png'
import uslugi from '../images/icons/uslugi.png'
import male from '../images/icons/male2.png'
import female from '../images/icons/female2.png'
import stairs from '../images/icons/marker.png'

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
  stairs, 
  studgorod, 
  imilogo,
  logo, 
  searchlogo, 
  eat, 
  apteka, 
  product, 
  uslugi, 
  male,
  female
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
    
export const bg = background;
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
