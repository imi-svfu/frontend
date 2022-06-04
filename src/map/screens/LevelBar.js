import React, { useState } from 'react';
import { setLevel } from '../store/tasks';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  levelBar: {
    margin: 'auto',
    color: 'white',
    border: '2px solid #AAA',
    borderRadius: '5px'
  },
}

const LevelBar = () => {
  const level = useSelector((state) => state.data.level);
  const dispatch = useDispatch();
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
  <div style={ styles.levelBar }>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
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
