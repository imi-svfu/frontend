import React from 'react'
import Container from 'react-bootstrap/Container'
import Menu from '../menu.jsx'

export default class Page extends React.Component {
  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Menu/>
        <div className="row">
          <div className="col">
            <h1>Страница</h1>
          </div>
        </div>
      </Container>
    )
  }
}
