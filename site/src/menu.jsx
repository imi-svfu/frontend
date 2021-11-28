import React from 'react'
import {NavLink} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'

export default function Menu() {
  return (
    <Navbar bg="light">
      <Container>
        <Nav>
          <NavLink className="nav-link" to="/">Главная</NavLink>
          <NavLink className="nav-link" to="/page">Страница</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}
