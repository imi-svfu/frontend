import {Box, Paper} from "@mui/material";
import LessonHourProgress from "./LessonHourProgress";
import "../styles/lessonHours.css"

const LessonHours = ({ lessons, lessonHours }) => {
  return (
  <Box className="lesson-hours" >
    {
      lessons.length !== 0 && (lessonHours.map(sh => {
        const lecHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.lectures;
        const praHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.practices;
        const labHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.labs;

        return (
          <Paper elevation={3} className="lesson-hours__item" >
            <h5 className="lesson-hours__item__title">{lessons.find(lesson => lesson.id === sh.lesson_id)?.subject}</h5>
            <ul>
              <li>
                <LessonHourProgress value={lecHours && sh.lec / lecHours * 100} />
                <p> LEC - {sh.lec} / {lecHours}</p>
              </li>
              <li>
                <LessonHourProgress value={praHours && sh.pra / praHours * 100} />
                <p> PRA - {sh.pra} / {praHours}</p>
              </li>
              <li>
                <LessonHourProgress value={labHours && sh.lab / labHours * 100} />
                <p> LAB - {sh.lab} / {labHours}</p>
              </li>
            </ul>
          </Paper>
        )}))}
  </Box>
  )
}

export default LessonHours