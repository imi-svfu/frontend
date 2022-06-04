import {useEffect, useState} from 'react';
import styles from './ManagePage.module.scss';
import axios from 'axios';
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {GROUP_LSIT, GROUP_SCHEDULES, LESSON_LIST, getLessonHours} from '../../../config';
import ManageTableComponent from '../../components/ManageTableComponent/ManageTableComponent';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm';
import LessonHours from '../../components/LessonHours/LessonHours';

const ManagePage = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [lessonsGlobal, setLessonsGlobal] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [weekDay, setWeekDay] = useState();
  const [pairNum, setPairNum] = useState();
  const [lessonHours, setLessonHours] = useState([]);
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
      .then(({data}) => setLessonHours(data))
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
      <div className={styles.inputWrapper}>
        <FormControl className={styles.formControl}>
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

      <LessonHours lessons={lessons} lessonHours={lessonHours} />

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
export default ManagePage