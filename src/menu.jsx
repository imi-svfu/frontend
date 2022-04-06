/* https://mui.com/components/drawers/#responsive-drawer */

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import {
  Article as ArticleIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  QuestionMark as QuestionMarkIcon,
  EventNote as ScheduleIcon
} from '@mui/icons-material';

// Меню
function drawer() {
  return (
    <Box>
      {/* Пустая панель заполняющая место под верхней панелью */}
      <Toolbar />

      {/* Пункты меню */}
      <List>
        <ListItem>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>
            <Link to="/" style={{ textDecoration: 'none' }}>Главная</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <ListItemText>
            <Link to="/page" style={{ textDecoration: 'none' }}>Страница</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon><QuestionMarkIcon /></ListItemIcon>
          <ListItemText>
            <Link to="/questions" style={{ textDecoration: 'none' }}>Вопросы</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon><ScheduleIcon /></ListItemIcon>
          <ListItemText>
            <Link to="/timetable" style={{ textDecoration: 'none' }}>Расписание</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}

// Ширина выдвижного меню
const drawerWidth = 240;

// Функциональный компонент
export default function MenuComponent() {
  // На телефоне есть два состояния: выдвинут / задвинут
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Нажатие на гамбургер в верхней панели (заговке)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      {/* Верхняя панель (заголовок) */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography>
            {/* Кнопка для выдвигания меню на телефоне */}
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                marginRight: 1,
                display: { sm: 'none' },
              }}
            >
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
        {/* Телефон */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          ModalProps={{
            keepMounted: true, // Чтобы не тормозило на телефоне
          }}
        >
          {drawer()}
        </Drawer>

        {/* Нетелефон */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer()}
        </Drawer>
      </Box>

      {/* Основная часть */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2, // отступ вокруг
          paddingTop: 6, // отступ сверху
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
