import { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/scheduleForm.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';

import {availableRoomsForSchedule, SCHEDULES} from "../../config";

const ScheduleForm = ({open, setOpen, lessons, groupId, weekDay, pairNum, schedules, setSchedules}) => {
  const [lesson, setLesson] = useState();
  const [repeatOption, setRepeatOption] = useState(0);
  const [type, setType] = useState();
  const [cab, setCab] = useState();
  const [availableCabs, setAvailableCabs] = useState([]);
  const [common, setCommon] = useState(false);

  useEffect(() => {
    axios
      .get(availableRoomsForSchedule(groupId, weekDay, pairNum))
      .then(({data}) => setAvailableCabs(data))
      .catch(function (error) {
        console.log(error.response.data);
      })
  }, [weekDay, pairNum]);

  console.log(lessons.find(l => l.id === lesson))

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .post(SCHEDULES, {
        lesson: lesson,
        room: cab,
        type: type,
        pair_num: pairNum,
        week_day: weekDay,
        repeat_option: repeatOption,
        common: common
      })
      .then(res => setSchedules([...schedules, {...res.data}]))
      .then(() => handleClose())
      .catch(err => console.log(err))
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить график занятия</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Выберите параметры графика занятия
          </DialogContentText>
          <div className="formControlWrapper">
            <FormControl fullWidth>
              <InputLabel id="lesson-select-label">Дисциплина</InputLabel>
              <Select
                labelId="lesson-select-label"
                id="lesson-select"
                value={lesson}
                label="Дисциплина"
                onChange={e => setLesson(e.target.value)}
              >
                {
                lessons?.map((l) => (
                  <MenuItem key={l.id} value={l.id}>{l.subject}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="repeatOption-select-label">Параметр повторения</InputLabel>
              <Select
                labelId="repeatOption-select-label"
                id="repeatOption-select"
                value={repeatOption}
                label="Вид занятия"
                onChange={e => setRepeatOption(e.target.value)}
              >
                <MenuItem value={0}>Каждую неделю</MenuItem>
                <MenuItem value={1}>По нечетным</MenuItem>
                <MenuItem value={2}>По четным</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="type-select-label">Вид занятия</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                label="Вид занятия"
                onChange={e => setType(e.target.value)}
              >
                <MenuItem value="LEC">Лекция</MenuItem>
                <MenuItem value="PRA">Практика</MenuItem>
                <MenuItem value="LAB">Лабораторная</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="cab-select-label">Кабинет</InputLabel>
              <Select
                labelId="cab-select-label"
                id="cab-select"
                value={cab}
                label="Кабинет"
                onChange={e => setCab(e.target.value)}
              >
                {
                  availableCabs.map(cab =>
                    <MenuItem key={cab.id} value={cab.id}>{cab.num}</MenuItem>
                  )
                }
              </Select>
            </FormControl>

            <FormControlLabel control={<Checkbox checked={common} onChange={() => setCommon(!common)} />} label="Потоковое занятие" />

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={() => handleSubmit()}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ScheduleForm