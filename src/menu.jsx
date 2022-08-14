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

import listItems from "./assets/menu.json";

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
          {listItems.map((el, i) => (
            <ListItemButton
              onClick={() => toggleSidebar(false)}
              key={i}
              sx={el.subItem && { pl: 4 }}
            >
              <Link to={el.link}>
                <ListItemText>{el.text}</ListItemText>
              </Link>
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>

      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Menu;
