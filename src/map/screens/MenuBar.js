import React, { useState } from 'react';

import { search, updateMove } from '../consts/functions'
import { setItem } from '../store/tasks';
import { useDispatch } from 'react-redux';

import { searchlogo, eat, product, apteka, uslugi, imilogo } from '../consts/variables'

const styles = {
  menuBar: {
    display: 'none',
    zIndex: 4,
    width: '350px',
    position: 'fixed',
    right: 0,
    top: '60px', 
    background: '#EEEEEE',
    height: '100%'
  },
  container: {
    width: '0px auto',
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
  },
  searchItem: {
    background: 'white',
    width: '100%',
    height: '50px',
    border: '1px solid #DDDDDD'
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
    width: 80,
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
  const [text, setText] = useState('');
  const [pressed, setPressed] = useState(false)
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  return (
    <div style={styles.menuBar}>
      <div style={styles.container}>
        <div>
          <img src={imilogo} style={styles.logo}/>
        </div>
        <div style={ styles.menuTitle }>
          Путеводитель по студгородку
        </div>
        <div style={{ marginVertical: '50px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }} >
            <input
              style={{ ...styles.search }}
              type="text"
              name="Поиск"
              placeholder='Поиск'
              onChange={txt => {
                setText(txt.target.value)
              }}
            />
            <button
              type="submit"
              style={{
                ...styles.search,
                width: '40px',
                padding: 0,
                height: '40px'
              }}
              onClick={() => {
                updateMove(true)
                setItems(search(text))
                setPressed(true)
              }}
            >
              <img
                src={ searchlogo }
                style={ styles.searchLogo }
              />
            </button>
          </div>
          <div style={{
            position: 'fixed',
            // top: 0,
            background: '#09304A',
            height: (text.length > 0 && pressed) ? '50px' : 0,
            color: items.length > 0 ? 'black' : 'white',
            width: '300px',
            margin: '10px auto'
          }}>
            {(pressed & text.length > 0)
              ? (items.length != 0)
                  ? items.map(item =>
                  <div 
                    key={item.properties.number} 
                    style={ styles.searchItem } 
                    onClick={txt => { 
                      dispatch(setItem(item)) 
                      setPressed(false)
                    }}
                  >
                    {item.properties.name }
                    <br />Номер кабинета {item.properties.number}
                  </div>
                  )
                  : 'Ничего не найдено'
              : ''}
          </div>
        </div>
        <div style={styles.buttons}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '15px 0' }}>
            <div style={styles.columns}>
              <div style={{ margin: '5px auto' }}>поесть</div>
              <img src={eat} style={ styles.img }></img>
            </div>
            <div style={styles.columns}>
              <div style={{ margin: '5px auto' }}>места</div>
              <img src={eat} style={ styles.img }></img>
            </div>
            <div style={styles.columns}>
            <div style={{ margin: '5px auto' }}>аптека</div>
              <img src={apteka} style={ styles.img }></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
