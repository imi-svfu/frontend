import React, { useState } from 'react';
import { auth } from '../store/tasks'
import ReactDOM from 'react-dom';

const styles = {
  levelBar: {
    zIndex: 3,
    width: '300px',  
    position: 'fixed',
    top: '60px', 
    right: 250,
    background: '#EEEEEE',
    height: '50px'
  },
}

const LevelBar = () => {
  const [level, setLevel] = useState(2);
  auth.dispatch({ 
    type: 'setLevel', level: level 
  });
  const change = op => {
    if (op === 'up') {
      if (level === 4) {
        setLevel(0)
      } else {
        setLevel(level + 1)
      }
    } else {
      if (level === 0) {
        setLevel(4)
      } else {
        setLevel(level - 1)
      }
    }
  }
  console.log(auth.getState())
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
