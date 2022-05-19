import React, { useState } from 'react';
import { color2 } from '../consts/variables'
import icon from '../images/icons/icon.png'
import { useNavigate } from 'react-router-dom'
import { Line, search } from '../consts/functions'
import { setItem } from '../store/tasks';
import { useDispatch } from 'react-redux';

const styles = {
  container: {
    width: '70%',
    margin: '0 auto',
  },
  innerElText: {
    textAlign: 'center',
    fontSize: '24px',
    color: 'white',
  },
  searchLogo: {
    width: 25,
    height: 25,
  },
  columns: {
    background: color2,
    width: 275,
    height: 300,
    display: 'flex',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    fontAlign: 'center'
  },
  buttons: {
    justifyContent: 'space'
  },
  img: {
    width: 100,
    height: 100,
    margin: '25px auto'
  },
  columnText: {
    fontSize: 24,
    color: 'blackg',
    fontFamily: 'Nunito',
    margin: '15px auto'
  },
  textArea: {
    width: '375px',
    display: 'flex',
    backgroundColor: '#fff',
    border: '2px solid #DBDBDB',
    borderRadius: 5,
    margin: '20px auto',
    fontSize: 16,
    fontFamily: 'Nunito',
    overflow: 'hidden',
    height: '20px',
    padding: '10px',
    resize: 'none',
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '300px',
    marginBottom: '100px',
    background: '#E8DCC6',
  },
  searchItem: {
    height: '100px',
    width: '80%',
    margin: '100px auto'
  },
  searchItemBigText: {
    fontSize: '28px',
    fontFamily: 'HelveticaNeueMedium'
  },
  searchItemText: {
    display: 'flex',
    fontSize: '20px',
    fontFamily: 'HelveticaNeueMedium'
  },
  searchItemColumn: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    margin: '10px 0'
  }
}

const FaqPage = () => {
  const [mode, setMode] = useState(false)
  const [text, setText] = useState('');
  const [pressed, setPressed] = useState(false)
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToMap = () => {
    navigate('/map')
  }
  return (
    <div>
      <div style={styles.container}>
        {Line(3)}
        <div style={styles.blocks}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={styles.columns}>
              <img src={icon} style={ styles.img }></img>
              <div style={ styles.columnText }>СтудОрги</div>
            </div>
            <div style={styles.columns}>
              <img src={icon} style={ styles.img }></img>
              <div style={ styles.columnText }>Корпусные здания</div>
            </div>
            <div style={styles.columns}>
              <img src={icon} style={ styles.img }></img>
              <div style={ styles.columnText }>Справки, документы</div>
            </div>
            <div style={styles.columns}>
              <img src={icon} style={ styles.img }></img>
              <div style={ styles.columnText }>Общежития</div>
            </div>
          </div>
          {Line(3)}
          <textarea 
            style={ styles.textArea } 
            placeholder='Поиск'
            onChange={txt => {
              setText(txt.target.value)
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', color: 'white' }}>
            <div style={{ width: '200px', margin: '0 auto' }}>
              <input 
                type="checkbox" 
                checked={mode} 
                onChange={() => { setMode(!mode) }}
              />
              По корпусам
            </div>
            <div style={{ width: '200px', margin: '0 auto' }}>
              <input 
                type="checkbox" 
                checked={!mode} 
                onChange={() => setMode(!mode)} 
              />
              По номерам кабинетов
            </div>
          </div>
          <button 
            style={{ display: 'flex', padding: '15px 30px', display: 'flex', background: 'white', borderRadius: '2px', margin: '20px auto' }}
            onClick={() => {
              setItems(search(text, mode))
              setPressed(true)
            }}
          >
            Найти
          </button>
          <div style={{ ...styles.results, height: (pressed) ? '100%' : '300px' }}>
            <div style={{ ...styles.searchItem, ...styles.searchItemBigText, margin: '0 auto', paddingTop: '25px', height: 0, marginTop: '50px' }}>
              Результаты поиска:
            </div>
            {(pressed)
              ? (items.length != 0)
                  ? items.map(item =>
                  <div 
                    key={item.properties.name} 
                    style={ styles.searchItem } 
                    onClick={txt => { 
                      dispatch(setItem(item)) 
                      navigateToMap()
                    }}
                  >
                    <div style={ styles.searchItemBigText }>
                      {mode ? item.properties.name : item.properties.number }
                    </div>
                    <div style={ styles.searchItemColumn }>
                      <div style={ styles.searchItemText }>Расположение:</div> 
                      <div style={{ ...styles.searchItemText, fontFamily: 'HelveticaNeue', right: 0 }}>{item.properties.address} Кулаковского 44</div>
                    </div>
                    <div style={ styles.searchItemColumn }>
                      <div style={ styles.searchItemText }>Время работы:</div> 
                      <div style={{ ...styles.searchItemText, fontFamily: 'HelveticaNeue', right: 0 }}>{item.properties.address} с 8:00 до 23:00</div>
                    </div>
                    {Line(3)}
                  </div>
                  )
                  : <div style={{ ...styles.searchItem, justifyContent: 'center' }}>
                      <div style= {{ ...styles.searchItemText, margin: 'auto' }}>
                        Ничего не найдено
                      </div>
                    </div>
              : ''}

            </div>
          <div>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
