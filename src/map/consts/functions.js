import React, { useEffect, useState } from 'react';
import { places, floors } from './variables'
import { GeoJSON } from 'react-leaflet';

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

export const searchResult = (data, map, style, move) => {
  console.log(data)
  if (data !== null) {
    if (map && move) { 
      map.flyTo({
        lat: data.geometry.coordinates[0][0][1],
        lng: data.geometry.coordinates[0][0][0]
      })
    }
    return <GeoJSON data={[data]} key={data.properties.number} style={style} onEachFeature={onResult}/>
  }
}

const onEachBuilding = (feature, layer) => {
  layer.bindPopup('<h5>' + feature.properties.type + '</h5> <p>' + feature.properties.number + '</p> <p>Свободно</p> ');
  layer.on({
    click: layer.openPopup(),

    mouseout: e => {
      layer.closePopup();
    }
  });
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

const onEachFeature = (feature, layer) => {
  const type = feature.properties.type
  var customOptions =
  {
    width: 500,
  }
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

  layer.on({
    click: layer.openPopup(),

    mouseout: e => {
      layer.closePopup();
    }
  });
}

const onResult = (feature, layer) => {
  const type = feature.properties.type
  layer.bindPopup(customPopup(type, feature.properties.number));
  layer.setStyle({
    fillColor: '#aaa',
    fillOpacity: 1.5,
    weight: 1.5
  });
  layer.openPopup()

  layer.on({
    click: layer.openPopup(),

    mouseout: e => {
      layer.openPopup();
    }
  });
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
