import {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {GROUP_LSIT, GROUP_SCHEDULES, lessonsByGroupId, getLessonHours} from "../../config";
import '../styles/manage.css'
import ManageTableComponent from "./ManageTableComponent";
import ScheduleForm from "./ScheduleForm";

const ManageTabletime = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [schedules, setSchedules] = useState([]);
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

    axios
      .get(lessonsByGroupId(group))
      .then(({data}) => setLessons(data))
      .catch(function (error) {
        console.log(error.response.data);
      })

    axios
      .get(getLessonHours(group))
      .then(({data}) => setScheduleHours(data))
      .catch(err => console.log(err))

  }, [group]);

  useEffect(() => {
    axios.get(GROUP_LSIT).then(({data}) => {
      setGroups(data);
    });
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
      <div className="hours">
        {/*{*/}
        {/*  lessons.length !== 0 && (scheduleHours.map(sh => (*/}
        {/*  <div>*/}
        {/*    <h5>{lessons.find(lesson => lesson.id === sh.lesson_id).subject} -</h5>*/}
        {/*    <p> LEC - {sh.lec} из {lessons.find(lesson => lesson.id === sh.lesson_id).lectures}</p>*/}
        {/*    <p> PRA - {sh.pra} из {lessons.find(lesson => lesson.id === sh.lesson_id).practices}</p>*/}
        {/*    <p> LAB - {sh.lab} из {lessons.find(lesson => lesson.id === sh.lesson_id).labs}</p>*/}
        {/*  </div>*/}
        {/*)))}*/}
      </div>
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