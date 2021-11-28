import React from 'react'
import {Container} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Menu from '../menu.jsx'

const {API_URL} = process.env;

export default class Home extends React.Component {
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
        <Menu/>
        <div className="row">
          <div className="col">
            <ReactMarkdown>{this.state.content}</ReactMarkdown>
          </div>
        </div>
      </Container>
    )
  }
}
