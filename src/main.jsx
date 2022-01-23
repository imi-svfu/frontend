import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import MenuComponent from './menu';
import HomeComponent from './routes/home';
import PageComponent from './routes/page';
import QuestionComponent from './routes/question';
import QuestionsComponent from './routes/questions';

const { API_URL } = process.env;

function Main() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!questions.length) {
      fetch(`${API_URL}/questions/`)
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    }
  });

  return (
    <React.StrictMode>
      <HashRouter>
        <CssBaseline />
        <Routes>
          <Route path="" element={<MenuComponent />}>
            <Route index element={<HomeComponent />} />
            <Route path="page" element={<PageComponent />} />
            <Route path="questions" element={<QuestionsComponent questions={questions} />} />
            <Route path="question/:id" element={<QuestionComponent questions={questions} />} />
          </Route>
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
