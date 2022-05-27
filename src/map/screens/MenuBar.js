import React, { useState } from 'react';

import { search, checkLevel } from '../consts/functions'
import { setItem, setMove, setLevel } from '../store/tasks';
import { useDispatch } from 'react-redux';

import { searchlogo, eat, product, apteka, uslugi, imilogo } from '../consts/variables'

const styles = {
  menuBar: {
    zIndex: 4,
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: '0',
    margin: '0 auto'
  },
  container: {
    margin: '0px auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  search: {
    width: '200px',
    backgroundColor: '#fff',
    border: '2px solid #DBDBDB',
    margin: '0px 10px',
    height: '36px',
    padding: '0px 15px',
    lineHeight: 0,
    borderRadius: 5,
  },
  searchItem: {
    background: 'white',
    width: '250px',
    border: '2px solid #DDDDDD',
    borderRadius: '10px',
    padding: '0px 20px',
    height: '40px',
    margin: '2px',
    fontSize: 14,
    fontAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  logo: {
    width: '175px',
    height: '175px',
    display: 'flex',
    margin: '25px auto'
  },
  menuTitle: {
    fontSize: 20,
    fontAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontStyle: 'Medium',
    margin: '0 auto'
  },
  searchLogo: {
    width: 25,
    height: 25,
  },
  columns: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 15px',
    fontAlign: 'center'
  },
  buttons: {
    justifyContent: 'space'
  },
  img: {
    width: 60,
    height: 60,
    margin: 'auto'
  }
}

const MenuBar = () => {
  const [pressed, setPressed] = useState(false)
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  
  return (
    <div style={styles.menuBar}>
      <div style={styles.container}>
        <div style={{ marginVertical: '50px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }} >
            <input
              style={{ ...styles.search }}
              type="text"
              name="Поиск"
              placeholder='Поиск'
              autoComplete="off"
              onChange={txt => {
                setItems(search(txt.target.value))
                setPressed(true)
                console.log(txt.target.value)
              }}
            />
          </div>
          <div style={{
            position: 'fixed',
            // top: 0,
            left: '50%',
            transform: 'translate(-50%, 0)',
            height: (pressed) ? '50px' : 0,
            color: items.length > 0 ? 'black' : 'white',
            margin: '0px auto'
          }}>
            {(pressed)
              ? (items.length != 0)
                  ? items.map(item =>
                  <button
                    key={item.properties.number} 
                    style={{ ...styles.searchItem, transform: 'translate(0, -0' + (480 - (10 - items.length) * 44) + 'px)', }} 
                    onClick={() => { 
                      dispatch(setLevel(parseInt(item.properties.number[0], 10) - 1))
                      dispatch(setMove(true)) 
                      dispatch(setItem(item)) 
                      setPressed(false)
                    }}
                    href="/kek"
                  >
                    <div style={{margin: 'auto'}}>
                    Местоположение: {item.properties.name }
                    <br />Аудитория: {item.properties.number}
                    </div>
                  </button>
                  )
                  : undefined
              : ''}
          </div>
        </div>

      </div>
    </div>
  );
}

export default MenuBar;
