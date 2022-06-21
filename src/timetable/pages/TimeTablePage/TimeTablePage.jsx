import { useEffect, useState } from 'react';
import styles from './TimeTablePage.module.scss';
import Scheduler from '../../components/scheduler/Scheduler/Scheduler';
import { useArrayState } from '../../components/scheduler/useArrayState';
import ChoiceData from '../../components/ChoiceData';
import {GROUP_LSIT, WEEK_EVENTS} from '../../../config';
import axios from 'axios';
import Calendar from '../../components/Calendar';
import DATE_UTILS from '../../components/scheduler/date';
import {Alert, Grid} from "@mui/material";

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
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3} className={styles.inputWrapper}>
          <Grid container>
            <Grid item xs={12} sm={6} lg={12} style={{margin: 'auto 0'}}>
              <ChoiceData
                requestParams={requestParams}
                setRequestParams={setRequestParams}
                groups={groups}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
            <Calendar selected={selected} setSelected={setSelected}/>
          </Grid>
          </Grid>

          {errorMsg && <Alert severity="info">{errorMsg}</Alert>}

        </Grid>
        <Grid item xs={12} lg={9}>
        <Scheduler
          events={events}
          selected={selected}
          setSelected={setSelected}
        />
        </Grid>
      </Grid>
  );
};

export default TimeTablePage;
