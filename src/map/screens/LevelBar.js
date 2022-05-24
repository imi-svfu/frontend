import React, { useState } from 'react';
import { setLevel } from '../store/tasks';
import { useDispatch } from 'react-redux';

const styles = {
  levelBar: {
    zIndex: 4,
    width: '300px',  
    position: 'fixed',
    top: '60px', 
    right: 250,
    background: '#EEEEEE',
    height: '50px'
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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        Этаж: { level + 1 }
      </div>
      <button onClick={() => change('up')}>
        U
      </button>
      <button onClick={() => change('down')}>
        D
      </button>
    </div>
  </div>
  );
}

export default LevelBar;
