import './index.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { navBarItems } from '../consts/variables'

import LevelBar from './LevelBar'

import { search, checkLevel } from '../consts/functions'
import { setItem, setMove, setLevel } from '../store/tasks';
import { useDispatch } from 'react-redux';

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const styles = {
  menuBar: {
    margin: '0 auto'
  },
  container: {
    margin: '0 auto',
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
    margin: '2px auto',
    fontSize: 14,
    fontAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
}

const NavigationBar = (props) => {
  return (
    <Navbar>
        <DropdownMenu sizes={props.sizes}></DropdownMenu>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const [menuWidth, setMenuWidth] = useState(300);
  const [pressed, setPressed] = useState(false)
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 25);
    if (props.sizes.width < 600) setMenuWidth(props.sizes.width)
  }

  function DropdownItem(props) {
    return (
      <a 
        href="#" 
        className="menu-item" 
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu)
          props.customClickEvent()
        }} 
        style={props.style}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight, width: menuWidth }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={1000}
        classNames="menu-primary"
        unmountOnExit
        onEnter={(el) => {
          calcHeight(el)
          setMenuWidth(300)
        }}>
        <div className="menu">
          <a className="menu-item" style={{ background: '#AAAAAA88'}}>Навигационное меню</a>
          <LevelBar />
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="places">
            Места
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="search">
            Поиск
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'places'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Меню</h2>
          </DropdownItem>
          <DropdownItem goToMenu="outer" leftIcon={<ArrowIcon />}>
            В студгородке
          </DropdownItem>
          <DropdownItem goToMenu="building" leftIcon={<ArrowIcon />}>
            Внутри зданий
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'outer'}
        timeout={200}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Меню</h2>
          </DropdownItem>
          <DropdownItem goToMenu="outer" leftIcon={<ArrowIcon />}>
            В студгородке
          </DropdownItem>
          <DropdownItem goToMenu="building" leftIcon={<ArrowIcon />}>
            Внутри зданий
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'building'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Меню</h2>
          </DropdownItem>
          {navBarItems.map(item => {
            return(
              <DropdownItem key={item.name}>
                {item.name}
              </DropdownItem>
            )
          })}
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'search'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={() => {calcHeight({offsetHeight: 100})}}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Меню</h2>
          </DropdownItem>
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
                  setMenuHeight(100 + search(txt.target.value).length * 60)
                  console.log(menuHeight)
                  setPressed(true)
                  console.log(items)
                }}
              />
            </div>
            <div style={{
              // top: 0,
              height: (pressed) ? '50px' : 0,
              color: items.length > 0 ? 'black' : 'white',
              margin: '0px auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {(pressed)
                ? (items.length != 0)
                  ? items.map(item =>
                    <DropdownItem
                      goToMenu="main"
                      style={{background: "#66666688", height: '50px'}}
                      customClickEvent={() => { 
                        dispatch(setLevel(parseInt(item.properties.number[0], 10) - 1))
                        dispatch(setMove(true)) 
                        dispatch(setItem(item)) 
                        console.log(item)
                        setPressed(false)
                      }}
                    >
                      <div
                        key={item.properties.number} 
                        style={{height: '40px'}}

                        href="/kek"
                      >
                        <div style={{margin: 'auto'}}>
                        { item.properties.name ? item.properties.name : 'Аудитория' }
                        <br />{ 
                                item.properties.building 
                                  ? item.properties["addr:street"] + ' ' +item.properties["addr:housenumber"] 
                                  : "Номер аудитории:" + item.properties.number 
                              }
                        </div>
                      </div>
                    </DropdownItem>
                  )
                  : undefined
                : undefined}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavigationBar;