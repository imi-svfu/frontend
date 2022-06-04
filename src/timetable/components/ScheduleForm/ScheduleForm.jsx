import { useState, useEffect } from 'react';
import styles from './ScheduleForm.module.scss';
import axios from "axios";
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

import {availableRoomsForSchedule, scheduleById, SCHEDULES} from "../../../config";
import {FormLabel, RadioGroup, Radio, Typography} from "@mui/material";

const ScheduleForm =
  ({
     open,
     setOpen,
     lessons,
     groupId,
     weekDay,
     pairNum,
     schedules,
     setSchedules,
     scheduleId,
     setScheduleId
  }) => {

  const [lesson, setLesson] = useState();
  const [repeatOption, setRepeatOption] = useState();
  const [type, setType] = useState();
  const [cab, setCab] = useState();
  const [availableCabs, setAvailableCabs] = useState([]);
  const [subGroup, setSubGroup] = useState(false);
  const [common, setCommon] = useState(false);

  const weekDays = [
    {
      num: 1,
      str: "Понедельник"
    },
    {
      num: 2,
      str: "Вторник"
    },
    {
      num: 3,
      str: "Среда"
    },
    {
      num: 4,
      str: "Четверг"
    },
    {
      num: 5,
      str: "Пятница"
    },
    {
      num: 6,
      str: "Суббота"
    },
  ]

  const repOptParams = [
    {
      value: 0,
      label: "Каждую неделю"
    },
    {
      value: 1,
      label: "* По нечетным"
    },
    {
      value: 2,
      label: "** По четным"
    },
  ]

  const [availableRepeatOptions, setAvailableRepeatOptions] = useState(repOptParams);
  const schedule = schedules.find(s => s.id === scheduleId)
  useEffect(() => {
    const currentPairSchedules = schedules?.filter(schedule => schedule.week_day === weekDay && schedule.pair_num === pairNum)
    const result = currentPairSchedules?.reduce((sum, current) => {return sum + current.repeat_option}, 0)

    //Если в режиме редактирования
    if (scheduleId) {
      setLesson(schedule.lesson.id)
      setRepeatOption(schedule.repeat_option)
      setType(schedule.type)
      setCab(schedule.room.id)
      setCommon(schedule.common)

      if (result === 3) {
        setAvailableRepeatOptions([repOptParams.find(rop => rop.value === schedule?.repeat_option)])
      } else {
        setAvailableRepeatOptions(repOptParams);
      }
    } else {
      switch (result) {
        case 1:
          setAvailableRepeatOptions([repOptParams.find(rop => rop.value === 2)])
          break;
        case 2:
          setAvailableRepeatOptions([repOptParams.find(rop => rop.value === 1)])
          break;
        default:
          setAvailableRepeatOptions(repOptParams);
      }
    }

    setRepeatOption(availableRepeatOptions[0].value)

    if (repeatOption !== undefined && open){
      axios
        .get(availableRoomsForSchedule(groupId, weekDay, pairNum, repeatOption))
        .then(({data}) => setAvailableCabs(data))
        .catch(function (error) {
          console.log(error.response.data);
        })
    }
  }, [weekDay, pairNum, schedules, scheduleId, open, repeatOption]);


  const handleClose = () => {
    setScheduleId(null);
    setAvailableRepeatOptions(repOptParams);
    setOpen(false);
    setLesson();
    setRepeatOption(0);
    setType();
    setCab();
    setCommon(false);
  };

  const handleSubmit = () => {
    if (!scheduleId) {
      axios
        .post(SCHEDULES, {
          lesson: lesson,
          room: cab,
          type: type,
          pair_num: pairNum,
          week_day: weekDay,
          repeat_option: repeatOption,
          subgroup: subGroup,
          common,
        })
        .then(res => setSchedules([...schedules, {...res.data}]))
        .then(() => handleClose())
        .catch(err => console.log(err))
    } else {
      axios
        .patch(scheduleById(scheduleId), {
          lesson: lesson,
          room: cab,
          type: type,
          pair_num: pairNum,
          week_day: weekDay,
          repeat_option: repeatOption,
          subgroup: subGroup,
          common,
        })
        .then(res => {
          const newSchedules = schedules
          const schedIndex = newSchedules.findIndex(s => s.id === scheduleId)
          newSchedules[schedIndex] = res.data
          setSchedules(newSchedules)
        })
        .then(() => handleClose())
        .catch(err => console.log(err))
    }
    setScheduleId(null)
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить график занятия</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <div className={styles.info}>
            <Typography><b>День недели: </b>{weekDays.find(wd => wd.num === weekDay)?.str}</Typography>
            <Typography><b>Пара: </b>{pairNum}</Typography>
            <Typography><b>Преподаватель: </b>{lessons.find(l => l.id === lesson)?.lecturer?.name}</Typography>
          </div>
          <DialogContentText>
            Выберите параметры графика занятия
          </DialogContentText>
          <div className={styles.formControlWrapper}>
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

            <div className={styles.radioFormWrapper}>
              <FormControl>
                <FormLabel >Параметр повторения</FormLabel>
                <RadioGroup onChange={e => setRepeatOption(e.target.value)} className={styles.radioGroup}>
                  {availableRepeatOptions.map (arop =>
                    <FormControlLabel
                      key={arop.value}
                      value={arop.value}
                      checked={repeatOption === arop.value}
                      control={<Radio />}
                      label={arop.label}
                      onClick={() => setRepeatOption(arop.value)}
                    />
                  )}
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel >Вид занятия</FormLabel>
                <RadioGroup onChange={e => setType(e.target.value)} >
                  <FormControlLabel value="LEC" checked={type === "LEC"} control={<Radio />} label="Лекция" />
                  <FormControlLabel value="PRA" checked={type === "PRA"} control={<Radio />} label="Практика" />
                  <FormControlLabel value="LAB" checked={type === "LAB"} control={<Radio />} label="Лабораторная" />
                </RadioGroup>
              </FormControl>
            </div>

            <FormControl fullWidth>
              <InputLabel id="cab-select-label">Кабинет</InputLabel>
              <Select
                labelId="cab-select-label"
                id="cab-select"
                value={cab}
                label="Кабинет"
                onChange={e => setCab(e.target.value)}
              >
                {scheduleId &&
                  <MenuItem key={cab} value={cab}>{schedules.find(s => s.id === scheduleId).room.num}</MenuItem>
                }
                {availableCabs.map(cab =>
                    <MenuItem key={cab.id} value={cab.id}>{cab.num}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControlLabel control={<Checkbox checked={common} onChange={() => setCommon(!common)} />} label="Потоковое занятие" />
            <FormControlLabel control={<Checkbox checked={subGroup} onChange={() => setSubGroup(!subGroup)} />} label="Подгруппа" />

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={() => handleSubmit()}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ScheduleForm