import React, { useEffect, useState } from 'react';
import { places, floors, male, female, stairs, navBarItems } from './variables'
import { GeoJSON, Marker, Popup } from 'react-leaflet';
import { setMove } from '../store/tasks';
import { useDispatch } from 'react-redux';
import L from 'leaflet'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const search = (item, mode) => {
  const result = []
  if (item.length > 0) {
    if (mode) {
      places.map(buildings => {
        buildings.features.map(place => {
          const x = place
          if (x.properties.name !== undefined) {
            if (x.properties.name.includes(item)) {
              result.push(x)
            }
          }
        })
      })
    } else {
      for (var x in floors) {
        floors[x].map(buildings => {
          if (buildings !== 0) {
            buildings.features.map(place => {
              const x = place
              if (x.properties.number !== undefined && result.length < 5) {
                if (x.properties.number.includes(item)) {
                  result.push(x)
                }
              }
            })
          }
        })
      }
    }
  }
  return result
}

export const GetHeaderHeight = () => {
  const [height, setHeight] = useState('');
  React.useEffect(() => {
    const x = document.getElementById('header');
    setHeight(x.offsetHeight);
  });
  return height;
};

export const Line = (height) => {
  return <div style={{ width: '100%', height: height, background: 'white', margin: '40px auto', borderRadius: '2px' }}></div>
}

export const updateMove = (move = false) => {
  const dispatch = useDispatch();
  dispatch(setMove(move)) 
}

export const searchResult = (data, map, style, move) => {
  if (data !== null) {
    if (map && move) { 
      map.flyTo({
        lat: data.geometry.coordinates[0][0][1],
        lng: data.geometry.coordinates[0][0][0]
      })
      updateMove()
    }
    return <GeoJSON data={[data]} key={data.properties.number} style={style} onEachFeature={onResult}/>
  }
}

const onClick = (e) => {
  e.sourceTarget.openPopup()
}

const customPopup = (type, number) => {
  return (
   `<div style="width: 200px; height: 50px; margin: auto">
      <div style="display: flex; flex-direction: row; justify-content: space-between; font-size: 12px">
        <div>
          <b>КФЕН</b>
        </div>
        <div>
          ${number}
        </div>
      </div>
      <p style="font-size: 12px">
        ${type === 'Audience' ? 'Свободно' : ''}
      </p>
    </div>`
  )
}

const getIcon = type => {
  return new L.Icon({
    iconUrl: type === "male" 
      ? male 
      : type === "female" 
        ? female
        : type === "Stairs" 
          ? stairs
          : 'kekw',
    iconSize: [24, 24],
    shadowSize:   [30, 30], // size of the shadow
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  });
}

const onEachBuilding = (feature, layer, map) => {
  const kek = {center: {lat: layer.getBounds().getCenter().lat, lng: layer.getBounds().getCenter().lng}, type: 'building'}
  layer.bindPopup('<p>' + feature.properties.name + '</p> <p>' + feature.properties['addr:street'] + ' ' + feature.properties['addr:housenumber'] +'</p> ');
}

export const checkLevel = (item) => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.data.level);
  if (item.properties.number !== level.toString())
    dispatch(setLevel(item.properties.number))
}

const onEachFeature = (feature, layer) => {
  const type = feature.properties.type
  var customOptions = { width: 400 }
  layer.bindPopup(customPopup(type, feature.properties.number), customOptions);
  layer.setStyle(setStyle(feature))
}

const setStyle = (feature) => {
  const type = feature.properties.type
  return {
    fillColor: type === 'Audience' 
      ? navBarItems[0].color 
      : type === 'WC' 
        ? navBarItems[3].color 
        : type === 'Stairs'  
          ? navBarItems[5].color
          : type === 'noroute'
            ? '#AAA'
            : type === 'Elevator'
              ? navBarItems[4].color
              : type === 'Shop'
                ? navBarItems[2].color
                : type === 'Eatery'
                  ? navBarItems[6].color
                  : type === 'Exit'
                    ? '#C7F2DD'
                    : type === 'Hallway'
                      ? '#FFF6F6'
                      : type === 'Museum'
                        ? '#E8DCC6'
                        : '#888',
    fillOpacity: 1.5,
    weight: feature.properties.border === 'no' ? 0 : 1.5,
    color: "gray"
  }
}

const onResult = (feature, layer) => {
  const type = feature.properties.type
  layer.bindPopup(customPopup(type, feature.properties.number));
  
  layer.setStyle({
    fillColor: '#aaa',
    fillOpacity: 1.5,
    weight: 1.5
  });
  layer.on({
    add: onClick, 
  })
}

export const data = places => {
  return (
    <div>
      {places.map(item => {
        return <GeoJSON key={item.name} data={item.features} style={item.style} onEachFeature={onEachBuilding}/>
      })}
    </div>);
};

export const rooms = places => {
  return (
    <div>
      {places.map(item => {
        return <GeoJSON key={item.name} data={item.features} style={item.style} onEachFeature={onEachFeature}/>
      })}
    </div>);
};

const markerPopup = (type, number) => {
  return (
    <Popup>
      <div style={{width: "250px", height: "50px", margin: "auto"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "12px"}}>
          <div>
            КФЕН 
          </div>
          <div>
            {number} 
          </div>
        </div>
        <p style= {{fontSize: '12px'}}>
          {type === 'Audience' ? 'Свободно' : ''}
        </p>
      </div>
    </Popup>
  )
}

export const Markers = places => {
  return (
    <div>
      {places.map(item => {
        return( 
          <Marker position={item.center} key={item.center.lat} icon={getIcon(item.type)}>
            {item.type !== 'building' ? markerPopup(item.popup.type, item.popup.number) : <Popup>just marker</Popup>}
          </Marker>
        )  
      })}
    </div>);
};

export const getFeatureLocation = places => {
  let markers = []
  places.map(place => {
    var feature = L.geoJson(place)
    for (var item in feature._layers) {
      const x = feature._layers[item].getBounds().getCenter()
      markers.push({
        center: {
          lat: x.lat, 
          lng: x.lng
        }, 
        type: 'building'
      })
    }
  })
  return markers
}

export const getRoomLocation = place => {
  let markers = []
  place
  var feature = L.geoJson(place)
  for (var item in feature._layers) {
    const room = feature._layers[item]
    if (room.feature.properties.type !== undefined && room.feature.properties.type !== 'Audience')
      markers.push({
        center: {
          lat: room.getBounds().getCenter().lat, 
          lng: room.getBounds().getCenter().lng
        }, 
        type: room.feature.properties.type === 'WC' 
          ? room.feature.properties.for
          : room.feature.properties.type,
        popup: { 
          type: room.feature.properties.type, 
          number: room.feature.properties.number 
        }
      })
  }
  return markers
}