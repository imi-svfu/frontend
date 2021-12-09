import React from 'react'
import ReactMarkdown from 'react-markdown'

const {API_URL} = process.env;

export default class Home extends React.Component {
  state = {
    content: ''
  }

  fetchContent() {
    fetch(API_URL + '/pages/')
      .then(response => response.json())
      .then(pages => {
        if (pages.length > 0) {
          this.setState({
            content: pages[0]['markdown']
          })
        }
      })
  }

  constructor(props) {
    super(props)
    this.fetchContent()
  }

  render() {
    return (
      <ReactMarkdown>{this.state.content}</ReactMarkdown>
    )
  }
}
