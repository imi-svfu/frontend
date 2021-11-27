import React from 'react'
import ReactMarkdown from "react-markdown";

const {API_URL} = process.env;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
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
    return <ReactMarkdown>{this.state.content}</ReactMarkdown>
  }
}
