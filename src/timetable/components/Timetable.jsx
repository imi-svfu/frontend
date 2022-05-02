import { useEffect, useState } from "react";
import Scheduler from "./scheduler/Scheduler/Scheduler";
import { useArrayState } from "./scheduler/useArrayState";
import "../styles/main.css";
import ChoiceData from "./ChoiceData";
import {GROUP_LSIT, WEEK_EVENTS} from "../../config";
import axios from "axios";
import Calendar from "./Calendar";
import DATE_UTILS from "./scheduler/date"

const Timetable = () => {
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState();
  const [groups, setGroups] = useState([]);

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
        .then(({ data }) => setEventsHandler(data))
        .catch(function (error) {
          console.log(error.response.data);
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
    <div style={{ marginTop: "30px" }}>
      <div className="module">
        <div className="left-side">
          <div className="comboboxes">
            <ChoiceData
              requestParams={requestParams}
              setRequestParams={setRequestParams}
              groups={groups}
            />
          </div>
          <div className="calendar">
              <Calendar selected={selected} setSelected={setSelected}/>
          </div>

        </div>
        <div className="scheduler">
          <Scheduler
            events={events}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default Timetable;
