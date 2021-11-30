import React from 'react'
import {NavLink} from 'react-router-dom'

const {API_URL} = process.env;

export default class Questions extends React.Component {
  state = {
    questions: []
  }

  fetchQuestions() {
    fetch(API_URL + '/questions/')
      .then(response => response.json())
      .then(questions => {
        this.setState({
          questions: questions
        })
      })
  }

  constructor(props) {
    super(props)
    this.fetchQuestions()
  }

  render() {
    return (
      <div>
        <h1>Вопросы и ответы</h1>
        <ul>
          {this.state.questions.map(question => (
            <li key="{question['id']}">
              <NavLink to={`/question/${question['id']}`}>
                {question['title']}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
