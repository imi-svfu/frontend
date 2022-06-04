import { useEffect, useState } from "react";
import axios from "axios";
import { GROUP_LSIT, LECTURER_LIST, ROOM_LIST } from "../../config";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ChoiceData = ({ requestParams, setRequestParams, groups}) => {
  // const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [lecturer, setLecturer] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [type, setType] = useState("");
  const types = [
    {
      value: "group",
      name: "Группа",
    },
    {
      value: "lecturer",
      name: "Преподаватель",
    },
    {
      value: "room",
      name: "Кабинет",
    },
  ];

  // useEffect(() => {
  //   axios.get(GROUP_LSIT).then(({ data }) => {
  //     setGroups(data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get(LECTURER_LIST).then(({ data }) => {
      setLecturers(data);
    });
  }, []);

  useEffect(() => {
    axios.get(ROOM_LIST).then(({ data }) => {
      setRooms(data);
    });
  }, []);

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-label"> Выберите тип </InputLabel>
        <Select
          labelId="type-label"
          id="demo-simple-select"
          label="Group"
          onChange={(e) => {
            setType(e.target.value);
            setRequestParams({ ...requestParams, get_by: e.target.value });
          }}
          value={type}
        >
          {types.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === "group" && (
        <FormControl fullWidth>
          <InputLabel id="group-label"> Группа </InputLabel>
          <Select
            labelId="group-label"
            id="demo-simple-select"
            label="Group"
            onChange={(e) => {
              setGroup(e.target.value);
              setRequestParams({ ...requestParams, param_id: e.target.value });
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
      )}

      {type === "lecturer" && (
        <FormControl fullWidth>
          <InputLabel id="lecturer-label"> Выберите преподавателя </InputLabel>
          <Select
            labelId="lecturer-label"
            id="demo-simple-select"
            label="Lecturer"
            onChange={(e) => {
              setLecturer(e.target.value);
              setRequestParams({ ...requestParams, param_id: e.target.value });
            }}
            value={lecturer}
          >
            {lecturers.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {type === "room" && (
        <FormControl fullWidth>
          <InputLabel id="room-label"> Выберите кабинет </InputLabel>
          <Select
            labelId="room-label"
            id="demo-simple-select"
            label="Room"
            onChange={(e) => {
              setRoom(e.target.value);
              setRequestParams({ ...requestParams, param_id: e.target.value });
            }}
            value={room}
          >
            {rooms.map((room) => (
              <MenuItem key={room.num} value={room.id}>
                {room.num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default ChoiceData;
