import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { ReactComponent as ImiLogo } from "./assets/imi_logo.svg";

function Menu() {
  const [sidebarState, toggleSidebar] = useState(false);

  const [listItems] = useState([
    {
      text: 'Институт',
      link: '/',
    },
    {
      text: 'О нас',
      link: '/',
      subItem: true,
    },
    {
      text: 'Новости',
      link: '/',
      subItem: true,
    },
    {
      text: 'Мероприятия',
      link: '/',
    },
    {
      text: 'Абитуриенту',
      link: '/',
    },
    {
      text: 'Направления и программы',
      link: '/',
      subItem: true,
    },
    {
      text: 'Список документов',
      link: '/',
      subItem: true,
    },
    {
      text: 'Задать вопрос',
      link: '/',
      subItem: true,
    },
    {
      text: 'Расписание',
      link: '/timetable',
    },
    {
      text: 'Управление расписанием',
      link: '/managetabletime',
    },
    {
      text: 'Карта студгородка',
      link: '/map',
    },
  ]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Link to="/">
            <IconButton color="inherit" edge="start">
              <SvgIcon component={ImiLogo} inheritViewBox />
            </IconButton>
          </Link>
          <Typography sx={{ flexGrow: 1 }}>ИМИ СВФУ</Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => {
              toggleSidebar(!sidebarState);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="right"
        onClose={() => toggleSidebar(false)}
        onOpen={() => toggleSidebar(true)}
        open={sidebarState}
      >
        <List dense>
          {listItems.map((el, i) =>
            <ListItemButton
              onClick={() => toggleSidebar(false)}
              key={i}
              sx={el.subItem && { pl: 4 }}
            >
              <Link to={el.link}>
                <ListItemText>{el.text}</ListItemText>
              </Link>
            </ListItemButton>
          )}
        </List>
      </SwipeableDrawer>

      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Menu;
