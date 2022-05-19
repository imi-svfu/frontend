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
          <ListItemButton>
            <ListItemText>Институт</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText>О нас</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText>Новости</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Мероприятия</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Абитуриенту</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText>Направления и программы</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText>Список документов</ListItemText>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText>Задать вопрос</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <Link to="/timetable" style={{ textDecoration: "none" }}>
              <ListItemText>Расписание</ListItemText>
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Link to="/managetabletime" style={{ textDecoration: "none" }}>
              <ListItemText>Управление расписанием</ListItemText>
            </Link>
          </ListItemButton>
          <ListItemButton >
            <Link to="/map" style={{ textDecoration: "none" }}>
              <ListItemText>Карта студгородка</ListItemText>
            </Link>
          </ListItemButton>
        </List>
      </SwipeableDrawer>

      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Menu;
