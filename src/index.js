import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MenuComponent from './menu';
import HomeComponent from './routes/home';
import PageComponent from './routes/page';
import QuestionComponent from './routes/question';
import QuestionsComponent from './routes/questions';
import Timetable from './timetable/components/Timetable';
import ManageTabletime from "./timetable/components/ManageTabletime";

function Main() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!questions.length) {
      fetch(`http://127.0.0.1:8000/api/questions/`)
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    }
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MenuComponent />}>
            <Route index element={<HomeComponent />} />
            <Route path="page" element={<PageComponent />} />
            <Route
              path="questions"
              element={<QuestionsComponent questions={questions} />}
            />
            <Route
              path="question/:id"
              element={<QuestionComponent questions={questions} />}
            />
            <Route path="timetable" element={<Timetable />} />
            <Route path="managetabletime" element={<ManageTabletime />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
