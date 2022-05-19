import background from '../images/bg2-2.png';
import studgorod from '../images/studgorod.jpg';
import logo from '../images/logo2.png';
import imilogo from '../images/logo.png';
import searchlogo from '../images/icons/search.png'
import eat from '../images/icons/eat.png'
import apteka from '../images/icons/apteka.png'
import product from '../images/icons/product.png'
import uslugi from '../images/icons/uslugi.png'
import male from '../images/icons/male.png'
import female from '../images/icons/female.png'

import svfu from '../geojson/svfu.json'
import guk from '../geojson/guk.json'
import departments from '../geojson/deparments.json'
import ks from '../geojson/ks.json'
import floor3 from '../geojson/kfenfloors/floor3.json'

export { 
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
  svfu, guk, departments, ks, 
]

export const floors = {
  kfen: [0, 0, floor3, 0, 0]
}
