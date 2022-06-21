import React, { useState } from 'react';
import { setLevel } from '../store/tasks';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  levelBar: {
    color: 'white',
  },
}

const LevelBar = () => {
  const level = useSelector((state) => state.data.level);
  const dispatch = useDispatch();
  console.log()
  const change = op => {
    if (op === 'up') {
      if (level === 4) {
        dispatch(setLevel(0))
      } else {
        dispatch(setLevel(level + 1))
      }
    } else {
      if (level === 0) {
        dispatch(setLevel(4))
      } else {
        dispatch(setLevel(level - 1))
      }
    }
  }
  return (
  <div style={ styles.levelBar } className="menu-item">
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <div style={{ margin: 'auto' }}>
        Этаж: { level + 1 }
      </div>
      <div style={{right: 0, display: 'flex', flexDirection: 'row'}}>
        <button 
          style={{
            display: 'flex',
            padding: '5px',
            textAlign: 'center',
            margin: '0 5px',
          }}
          onClick={() => change('up')
        }>
          +
        </button>
        <button 
          style={{
            display: 'flex',
            padding: '5px 5px',
            textAlign: 'center',
            margin: '0 5px',
          }}
          onClick={() => change('down')
        }>
          -
        </button>
      </div>
    </div>
  </div>
  );
}

export default LevelBar;
