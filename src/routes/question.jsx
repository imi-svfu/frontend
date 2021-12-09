import React from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

const {API_URL} = process.env;

class Question extends React.Component {
  state = {
    answers: [],
    question: {}
  }

  fetchQuestion(id) {
    fetch(API_URL + '/questions/' + id + '/')
      .then(response => response.json())
      .then(question => {
        this.setState({
          question: question
        })
        console.log(question['answer_set'])
      })
  }

  constructor(props) {
    super(props)
    this.fetchQuestion(props.router.params.id)
  }

  render() {
    return (
      <div>
        <h1>{this.state.question['title']}</h1>
        <p>{this.state.question['text']}</p>
        <ul>
          {this.state.question['answer_set'].map(answer => (
            <li key={answer['id']}>
              {answer['text']}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default function(props) {
  let location = useLocation()
  let navigate = useNavigate()
  let params = useParams()
  return <Question {...props} router={{ location, navigate, params }}/>
}
