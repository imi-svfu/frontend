import React from 'react'
import ReactMarkdown from "react-markdown"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const {API_URL} = process.env;

export default class App extends React.Component {
  state = {
    content: ''
  }

  constructor(props) {
    super(props);
    const apiUrl = API_URL + '/pages/'
    fetch(apiUrl)
      .then((response) => response.json())
      .then((pages) => {
        if (pages.length > 0) {
          this.setState({
            content: pages[0]['markdown']
          })
        }
      })
  }

  render() {
    return (
      <Container>
        <Navbar bg="light">
          <Container>
            <Nav>
              <Nav.Link href="#">Главная</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="row">
          <div className="col">
            <ReactMarkdown>{this.state.content}</ReactMarkdown>
          </div>
        </div>
      </Container>
    )
  }
}
