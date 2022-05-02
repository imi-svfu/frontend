import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {GROUP_LSIT, GROUP_SCHEDULES, LESSON_LIST, lessonsByGroupId, getLessonHours} from "../../config";
import '../styles/manage.css'
import ManageTableComponent from "./ManageTableComponent";
import ScheduleForm from "./ScheduleForm";
import LessonHourProgress from "./LessonHourProgress";

const ManageTabletime = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [lessonsGlobal, setLessonsGlobal] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [weekDay, setWeekDay] = useState();
  const [pairNum, setPairNum] = useState();
  const [scheduleHours, setScheduleHours] = useState([]);
  const [editScheduleId, setEditScheduleId] = useState();


  useEffect(() => {
    axios
      .get(GROUP_SCHEDULES, {
        params: {
          id: group,
        },
      })
      .then(({data}) => setSchedules(data))
      .catch(function (error) {
        console.log(error.response.data);
      })

    setLessons(lessonsGlobal.filter(lesson => lesson.group.id === group))

    axios
      .get(getLessonHours(group))
      .then(({data}) => setScheduleHours(data))
      .catch(err => console.log(err))

  }, [group]);

  useEffect(() => {
    axios.get(GROUP_LSIT).then(({data}) => {
      setGroups(data);
    });

    axios
      .get(LESSON_LIST)
      .then(({data}) => setLessonsGlobal(data))
      .catch(function (error) {
        console.log(error.response.data);
      })

  }, []);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', margin: '2rem 0'}}>
        <FormControl sx={{width: '20%', margin: '0 auto'}}>
          <InputLabel id="group-label"> Группа </InputLabel>
          <Select
            labelId="group-label"
            id="demo-simple-select"
            label="Group"
            onChange={(e) => {
              setGroup(e.target.value);
            }}
            value={group}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box sx={{display:'flex', gap:5, flexWrap:'wrap', justifyContent: 'center', mb:3}}>
        {
          lessons.length !== 0 && (scheduleHours.map(sh => {
            const lecHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.lectures;
            const praHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.practices;
            const labHours = lessons.find(lesson => lesson.id === sh.lesson_id)?.labs;

            return (
              <Paper elevation={3} sx={{width: 150, textAlign: 'center'}}>
                <h5>{lessons.find(lesson => lesson.id === sh.lesson_id)?.subject}</h5>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:1}}>
                  <LessonHourProgress value={lecHours && sh.lec / lecHours * 100} />
                  <p> LEC - {sh.lec} / {lecHours}</p>
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:1}}>
                  <LessonHourProgress value={praHours && sh.pra / praHours * 100} />
                  <p> PRA - {sh.pra} / {praHours}</p>
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:1}}>
                  <LessonHourProgress value={labHours && sh.lab / labHours * 100} />
                  <p> LAB - {sh.lab} / {labHours}</p>
                </Box>
              </Paper>
            )}))}
      </Box>
      <ManageTableComponent 
        schedules={schedules} 
        setSchedules={setSchedules} 
        setSnackOpen={setSnackOpen} 
        setFormOpen={setFormOpen}
        setWeekDay={setWeekDay}
        setPairNum={setPairNum}
        setEditScheduleId={setEditScheduleId}
      />

      <ScheduleForm
        open={formOpen}
        setOpen={setFormOpen}
        lessons={lessons}
        groupId={group}
        weekDay={weekDay}
        pairNum={pairNum}
        schedules={schedules}
        setSchedules={setSchedules}
        scheduleId={editScheduleId}
        setScheduleId={setEditScheduleId}
      />
      
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </>
  )
}
export default ManageTabletime