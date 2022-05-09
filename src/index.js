import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Menu from "./menu";
import HomeComponent from "./routes/home";
import QuestionComponent from "./routes/question";
import QuestionsComponent from "./routes/questions";
import Timetable from "./timetable/components/Timetable";
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
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Menu />}>
            <Route index element={<HomeComponent />} />
            <Route path="questions" element={<QuestionsComponent questions={questions} />} />
            <Route path="question/:id" element={<QuestionComponent questions={questions} />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="managetabletime" element={<ManageTabletime />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
