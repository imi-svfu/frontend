import React, { useEffect, useState } from 'react';
import { places, floors } from './variables'
import { GeoJSON, Marker, Popup } from 'react-leaflet';
import { auth } from '../store/tasks'
import { male } from './variables'
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
          /// console.log(x)
        })
      })
    } else {
      for (var x in floors) {
        floors[x].map(buildings => {
          if (buildings !== 0) {
            buildings.features.map(place => {
              const x = place
              if (x.properties.number !== undefined) {
                if (x.properties.number.includes(item)) {
                  result.push(x)
                }
              }
              /// console.log(x)
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
  const x = auth.getState().level
  auth.dispatch({ 
    type: 'set', 
    value: { 
      level: x, 
      move: move 
    }  
  });
}

export const searchResult = (data, map, style) => {
  const move = auth.getState().move
  if (data !== null) {
    if (map && move) { 
      map.flyTo({
        lat: data.geometry.coordinates[0][0][1],
        lng: data.geometry.coordinates[0][0][0]
      })
      updateMove()
    }
    return <GeoJSON data={[data]} key={data.properties.number} style={style} onEachFeature={onResult} pointToLayer={onEachPoint}/>
  }
}

const onClick = (e) => {
  e.sourceTarget.openPopup()
}

const onEachBuilding = (feature, layer, map) => {
  const marker = new L.marker(layer.getBounds().getCenter())
  marker.addTo(map)

  layer.bindPopup('<h5>' + feature.properties.type + '</h5> <p>' + feature.properties.number + '</p> <p>Свободно</p> ');
}

const customPopup = (type, number) => {
  return (
   `<div style="width: 250px; height: 100px; margin: auto">
      <h2>
        ${type}
      </h2> 
      <div style="display: flex; flex-direction: row; justify-content: space-between; font-size: 16px">
        <div>
          КФЕН 
        </div>
        <div>
          ${number} 
        </div>
      </div>
      <p style="font-size: 16px">
        Свободно
      </p>
    </div>`
  )
}

const skater = new L.Icon({
  iconUrl: male,
  iconSize: [120, 100]
});

const onEachPoint = (feature, latlng) => {
  console.log(latlng)
  return L.Marker(latlng, skater)
}

const onEachFeature = (feature, layer, map) => {
  const type = feature.properties.type
  var customOptions = { width: 500 }
  layer.bindPopup(customPopup(type, feature.properties.number), customOptions);
  layer.setStyle({
    fillColor: type === 'Audience' 
      ? '#E2E2F1' 
      : type === 'WC' 
        ? '#ACDCF0' 
        : type === 'Stairs'  
          ? '#F4AA99'
          : '#aaa',
    fillOpacity: 1.5,
    weight: 1.5
  });
  const marker = new L.marker(layer.getBounds().getCenter())
  type === 'WC' 
    ? marker.addTo(map)
    : type === 'Stairs'  
      ? marker.addTo(map)
      : ''
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

export const data = (places, map) => {
 
  useEffect(() => {
    if (map) {
      const x = map
      places.map(item => {
        const points = new L.geoJSON(item.features, {
          pointToLayer: () => {
            return L.marker(latlng)
          },
          onEachFeature: (feature, layer) => onEachBuilding(feature, layer, map),
          style: item.style,
        }).addTo(map)
      })
    } 
  })
};

export const rooms = (places, map) => {
  useEffect(() => {
    if (map) {
      places.map(item => {
        const points = new L.geoJSON(item.features, {
          onEachFeature: (feature, layer) => onEachFeature(feature, layer, map),
          style: item.style,
        })
        points.addTo(map)
      })
    } 
  })
};

