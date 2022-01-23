import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function QuestionComponent({ questions }) {
  const params = useParams();
  let question = null;

  questions.forEach((q) => {
    if (q.id.toString() === params.id) {
      question = q;
      return true;
    }
    return false;
  });

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.text}</p>
      <p>{question.answer}</p>
    </div>
  );
}
QuestionComponent.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
