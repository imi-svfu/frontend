import React from 'react'
import { navBarItems } from '../consts/variables'

const styles = {
  navigationBar: {
    position: 'fixed',
    zIndex: 4,
    left: 0,
    top: 70,
  },
  navBarItem: {
    padding: '4px',
    margin: '3px',
    backgroundColor: 'rgba(9, 48, 74, 0.75)',
    color: 'white',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px'
  },
  circle: {
    background: 'white',
    display: 'flex',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    marginLeft: '5px',
    border: '1px #fff'
  },
  button: {
    backgroundColor: 'rgba(9, 48, 74, 0.75)',
    padding: '10px',
    margin: '0px 3px',
    borderRadius: 15,
    color: 'white'
  }
}

const NavigationBar = () => {
  const [pressed, setPressed] = React.useState(true)
  return (
    <div style={styles.navigationBar}>
      <button style={ styles.button } onClick={() => setPressed(!pressed)}>Показать / Скрыть</button>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {pressed 
          ? navBarItems.map(item => { return(
            <div key={item.name} style={{ ...styles.navBarItem}}>
              <div style={{...styles.circle, background: item.color}}></div>
              <div style={{ margin: '0 5px'}}>{item.name}</div>
            </div>
            )})
          : '' 
        }  
      </div>
    </div>
  )
}

export default NavigationBar;