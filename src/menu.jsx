import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import { Inbox as InboxIcon, Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 240;

// <NavLink className="nav-link" to="/">Главная</NavLink>
// <NavLink className="nav-link" to="/page">Страница</NavLink>
// <NavLink className="nav-link" to="/questions">Вопросы</NavLink>

function drawer() {
  return (
    <Box>
      {/* Пустая панель заполняющая место под верхней панелью */}
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText><Link to="/">Главная</Link></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText><Link to="/page">Страница</Link></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText><Link to="/questions">Вопросы</Link></ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}

export default function MenuComponent() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Верхняя панель */}
      <AppBar
        position="fixed"
        sx={{
          marginLeft: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <Typography>
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            ИМИ СВФУ
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Меню слева */}
      <Box
        component="nav"
        sx={{
          flexShrink: { sm: 0 },
          width: { sm: drawerWidth },
        }}
      >
        {/* Мобильная версия */}
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          // open={modalOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer()}
        </Drawer>
        {/* Десктопная версия */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer()}
        </Drawer>
      </Box>

      {/* Основная часть */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Пустая панель заполняющая место под верхней панелью */}
        <Toolbar />
        {/* Основной контент */}
        <Outlet />
      </Box>
    </Box>
  );
}
