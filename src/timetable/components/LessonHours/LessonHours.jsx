import {Box, Paper} from "@mui/material";
import LessonHourProgress from "./LessonHourProgress";
import styles from './LessonHours.module.scss';

const LessonHours = ({ lessons, lessonHours }) => {
  return (
  <Box className={styles.lessonHours} >
    {
      lessons.length !== 0 && (lessonHours.map(sh => {
        const lecHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.lectures;
        const praHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.practices;
        const labHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.labs;

        return (
          <Paper elevation={3} className={styles.card} >
            <h5 className={styles.cardTitle}>{lessons.find(lesson => lesson.id === sh.lesson_id)?.subject}</h5>
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