# Сайт ИМИ

## Технологический стек

Фронтенд написан с использованием библиотек:

* React
* Material UI

Фронтенд отображает меню с перечнем статических страниц. Фронтенд переходит по статическим страницам и отображает содержание выбранной.

Фронтенд отображает страницу с перечнем вопросов. Фронтенд открывает страницу с вопросом и ответами на него.

## Использованные пакеты

* React:
  - `react`
  - `react-dom`

* React-Router — навигация по сайту:
  - `react-router-dom`

* Material UI — компоненты интерфейса пользователя:
  - `@emotion/react`
  - `@emotion/styled`
  - `@mui/icons-material`
  - `@mui/material`

* React-Markdown — рендеринг Markdown в HTML.

* PropTypes — библиотека валидации типов данных
  - `prop-types`

* Babel — компилятор JS
  - `@babel/core`
  - `babel/loader`
  - `@babel/preset-env`
  - `@babel/preset-react`
  - `babel-plugin-import`

Использование `babel-plugin-import` — позволяет ускорить импорт компонентов при работе с Material UI.

* ESLint - линтер кода:
  - `eslint`
  - `eslint-config-airbnb`
  - `eslint-config-import`
  - `eslint-config-react`
  - `eslint-config-react-hooks`

* WebPack — сборщик модулей:
  - `webpack`
  - `webpack-cli`
  - `webpack-dev-server`
  - `copy-webpack-plugin`

Использование `copy-webpack-plugin` вместо `html-webpack-plugin` позволяет явным образом копировать несколько файлов из `src` при компиляции (`index.html`, `favicon.ico`, `service-worker.js`).
