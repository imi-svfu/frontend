import eatery from '../images/icons/rest.png'
import drug from '../images/icons/drug.png'
import elevator from '../images/icons/elevator.png'
import stairs from '../images/icons/marker.png'
import hanger from '../images/icons/hanger.png'
import WC from '../images/icons/WC.png'
import shop from '../images/icons/shop.png'
import building from '../images/icons/building.png'

import { 
  AccountBalanceOutlined as BuildingIcon,
  AddShoppingCartOutlined as ShopIcon,
  WcOutlined as WCIcon,
  RoomServiceOutlined as ServiceIcon,
  SchoolOutlined as AudienceIcon,
  ElevatorOutlined as ElevatorIcon,
  StairsOutlined as StairsIcon,
  FastfoodOutlined as EatIcon,
  CheckroomOutlined as CheckroomIcon,
  ExitToApp as ExitIcon,
  MapsHomeWorkOutlined as DormitoryIcon,
} from '@mui/icons-material';

import svfu from '../geojson/svfu.json'
import departments from '../geojson/deparments.json'

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
  hanger,
  building,
  ExitIcon
};

export const navBarItems = {
  Audience: {
    name: 'Аудитория',
    color: '#D0ECF8',
    icon: <AudienceIcon sx={{ color: '#D0ECF8' }}/>
  },
  Shop: {
    name: 'Магазин',
    color: '#99E98D',
    icon: <ShopIcon sx={{ color: '#99E98D' }}/>
  },
  WC: {
    name: 'Туалет',
    color: '#7EA3CF',
    icon: <WCIcon sx={{ color: '#7EA3CF' }}/>
  },
  Elevator: {
    name: 'Лифт',
    color: '#F8EC86',
    icon: <ElevatorIcon sx={{ color: '#F8EC86' }}/>
  },
  Stairs: {
    name: 'Лестница',
    color: '#FFB775',
    icon: <StairsIcon sx={{ color: '#FFB775' }}/>
  },
  Eatery: {
    name: 'Буфет, столовая',
    color: '#F9AEF1',
    icon: <EatIcon sx={{ color: '#F9AEF1' }}/>
  },
  Checkroom: {
    name: 'Гардероб',
    color: '#B18000',
    icon: <CheckroomIcon sx={{ color: '#B18000'}}/>
  }
}

export const mapPlaces = {
  Corps: {
    name: "Учебные корпуса",
    icon: <BuildingIcon />,
    key: 'орпус'
  },
  Dormitory: {
    name: "Общежития",
    icon: <DormitoryIcon />,
    key: "бщежити"
  },
  Service: {
    name: 'Услуги',
    color: '#B58DE9',
    icon: <ServiceIcon sx={{ color: '#B58DE9' }} />,
    key: 'Service'
  },
  Shop: {
    name: 'Магазин',
    color: '#99E98D',
    icon: <ShopIcon sx={{ color: '#99E98D' }}/>,
    key: 'Shop'
  },
  Eatery: {
    name: 'Буфет, столовая',
    color: '#F9AEF1',
    icon: <EatIcon sx={{ color: '#F9AEF1' }}/>,
    key: 'Eatery'
  },
}
    
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
  svfu, departments, 
]

export const floors = {
  kfen: [floor1, floor2, floor3, floor4, floor5]
}
