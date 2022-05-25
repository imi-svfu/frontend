import React, { useState } from 'react';
import { setLevel } from '../store/tasks';
import { useDispatch } from 'react-redux';

const styles = {
  levelBar: {
    zIndex: 4,
    position: 'fixed',
    top: '60px', 
    right: 0,
    background: '#E8DCC6',
    color: 'black',
    padding: '5px',
    border: '2px solid #AAA',
    borderRadius: '5px'
  },
}

const LevelBar = () => {
  const [level, setLvl] = useState(2);
  const dispatch = useDispatch();
  dispatch(setLevel(level)) 
  const change = op => {
    if (op === 'up') {
      if (level === 4) {
        setLvl(0)
      } else {
        setLvl(level + 1)
      }
    } else {
      if (level === 0) {
        setLvl(4)
      } else {
        setLvl(level - 1)
      }
    }
  }
  return (
  <div style={ styles.levelBar }>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        Этаж: { level + 1 }
      </div>
      <button 
        style={{
          display: 'flex',
          padding: '5px 5px',
          textAlign: 'center',
          margin: '0 auto',
        }}
        onClick={() => change('up')
      }>
        U
      </button>
      <button 
        style={{
          display: 'flex',
          padding: '5px 5px',
          textAlign: 'center',
          margin: '0 auto',
        }}
        onClick={() => change('down')
      }>
        D
      </button>
    </div>
  </div>
  );
}

export default LevelBar;
