import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './routes/home.jsx'
import Page from './routes/page.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="page" element={<Page/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
