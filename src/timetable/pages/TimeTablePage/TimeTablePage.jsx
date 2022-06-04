import { useEffect, useState } from 'react';
import styles from './TimeTablePage.module.scss';
import Scheduler from '../../components/scheduler/Scheduler/Scheduler';
import { useArrayState } from '../../components/scheduler/useArrayState';
import ChoiceData from '../../components/ChoiceData';
import {GROUP_LSIT, WEEK_EVENTS} from '../../../config';
import axios from 'axios';
import Calendar from '../../components/Calendar';
import DATE_UTILS from '../../components/scheduler/date';
import {Alert} from "@mui/material";

const TimeTablePage = () => {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents] = useArrayState();
  const [groups, setGroups] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  const weekStart = DATE_UTILS.first_of_week(selected);
  const weekEnd = new Date();
  weekEnd.setDate(weekStart.getDate() + 6)
  weekStart.setHours(0, 0, 0, 0)

  const [requestParams, setRequestParams] = useState({});

  useEffect(() => {
    axios
        .get(WEEK_EVENTS, {
        params: {
          get_by: requestParams.get_by,
          param_id: requestParams.param_id,
          start_date: weekStart.toISOString().split("T", 1)[0],
          end_date: weekEnd.toISOString().split("T", 1)[0],
        },
        })
        .then(({ data }) => {
          setEventsHandler(data)
          setErrorMsg(undefined)
        })
        .catch(function (error) {
          setErrorMsg(error.response.data.error)
        })

  }, [selected, requestParams.param_id]);

  useEffect(() => {
      axios.get(GROUP_LSIT).then(({ data }) => {
          setGroups(data);
      });
  }, []);

  const setEventsHandler = (schedules) => {
    setEvents([]);
    if (!schedules.error && schedules[0].id)
      setEvents(
        schedules.map((item) => ({
          from: new Date(item.begin),
          to: new Date(item.end),
          name: item.lesson.subject + ' ' + item.room.num + ' каб',
          calendar: {
            name: "calendar-name",
            enabled: true,
          },
        }))
      );
  };

  return (
      <div className={styles.main}>
        <aside className={styles.inputWrapper}>
          <div className={styles.comboboxes}>
            <ChoiceData
              requestParams={requestParams}
              setRequestParams={setRequestParams}
              groups={groups}
            />
          </div>
          <div className={styles.datePicker}>
            <Calendar selected={selected} setSelected={setSelected}/>
          </div>

          {errorMsg && <Alert severity="info">{errorMsg}</Alert>}

        </aside>
        <Scheduler
          events={events}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
  );
};

export default TimeTablePage;
