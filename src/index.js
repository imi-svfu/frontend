import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import Menu from "./menu";
import HomeComponent from "./routes/home";
import QuestionComponent from "./routes/question";
import QuestionsComponent from "./routes/questions";
import TimeTablePage from "./timetable/pages/TimeTablePage/TimeTablePage";
import ManagePage from "./timetable/pages/ManagePage/ManagePage";
import MainComponent from "./map/screens/MainComponent"

const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
})

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
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Menu />}>
            <Route index element={<HomeComponent />} />
            <Route path="questions" element={<QuestionsComponent questions={questions} />} />
            <Route path="question/:id" element={<QuestionComponent questions={questions} />} />
            <Route path="timetable" element={<TimeTablePage />} />
            <Route path="managetabletime" element={<ManagePage />} />
            <Route path="map" element={<MainComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
