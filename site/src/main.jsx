import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, NavLink, Outlet, Route, Routes} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import Home from './routes/home.jsx'
import Page from './routes/page.jsx'
import Question from './routes/question.jsx'
import Questions from './routes/questions.jsx'

function Main() {
  return (
    <Container>
      <Navbar bg="light">
        <Container>
          <Nav>
            <NavLink className="nav-link" to="/">Главная</NavLink>
            <NavLink className="nav-link" to="/page">Страница</NavLink>
            <NavLink className="nav-link" to="/questions">Вопросы</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <div className="row">
        <div className="col">
          <Outlet/>
        </div>
      </div>
    </Container>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}>
        <Route index element={<Home/>}/>
        <Route path="page" element={<Page/>}/>
        <Route path="questions" element={<Questions/>}/>
        <Route path="question/:id" element={<Question/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
