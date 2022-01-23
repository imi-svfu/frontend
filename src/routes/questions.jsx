import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function QuestionsComponent({ questions }) {
  return (
    <div>
      <h1>Вопросы и ответы</h1>
      <ul>
        {
          questions.map((question) => (
            <li key="{question['id']}">
              <NavLink to={`/question/${question.id}`}>
                {question.title}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
QuestionsComponent.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
