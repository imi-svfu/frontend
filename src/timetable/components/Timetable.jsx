import { useEffect, useState } from "react";
import {
  Calendar,
  Scheduler,
  useArrayState,
} from "@cubedoodl/react-simple-scheduler";
import {
  Button
} from "@mui/material";
import "../styles/main.css";
import styles from "./timetable.modules.css"
import ChoiceData from "./ChoiceData";
import { WEEK_EVENTS } from "../../config";
import axios from "axios";

const Timetable = () => {
  const [schedules, setSchedules] = useState([]);
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState();

  // console.log(selected.toISOString().split('T', 1)[0])
  // console.log(selected.getDay())
  // const weekStart = selected - selected.getDate();
  const weekStart = new Date();
  const weekEnd = new Date();
  weekStart.setDate(selected.getDate() - selected.getDay() + 1);
  weekEnd.setDate(selected.getDate() - selected.getDay() + 7);
  // console.log(weekStart.toISOString().split('T', 1)[0])
  // console.log(weekEnd.toISOString().split('T', 1)[0])

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
        .then(({ data }) => setEventsHandler(data))
        // .then(() => setEventsHandler())
        .catch(function (error) {
          console.log(error.response.data);
          console.log(arguments);
        })

  }, [selected, requestParams.param_id]);

  const setEventsHandler = (schedules) => {
    setEvents([]);
    if (!schedules.error && schedules[0].id)
      setEvents(
        schedules.map((item) => ({
          from: new Date(item.begin),
          to: new Date(item.end),
          name: item.lesson.subject.name + ' ' + item.room.num + ' каб',
          calendar: {
            name: "calendar-name",
            enabled: true,
          },
        }))
      );
  };

  console.log(events);

  return (
    <div style={{ marginTop: "30px" }}>
      <div className="module">
        <div className="left-side">
          <div className="comboboxes">
            <ChoiceData
              requestParams={requestParams}
              setRequestParams={setRequestParams}
            />
          </div>
          <div className="calendar">
            <Calendar selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <div className="scheduler">
          <Scheduler
            events={events}
            selected={selected}
            setSelected={setSelected}
            onRequestAdd={(evt) => addEvent(evt)}
            onRequestEdit={(evt) => alert("Edit element requested")}
            style={styles.scheduler}
          />
        </div>
      </div>
    </div>
  );
};

export default Timetable;
