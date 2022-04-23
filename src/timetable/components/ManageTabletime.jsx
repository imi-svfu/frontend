import {useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {GROUP_LSIT, GROUP_SCHEDULES} from "../../config";
import '../styles/manage.css'
import ManageTableComponent from "./ManageTableComponent";

const ManageTabletime = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false)


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
      <ManageTableComponent schedules={schedules} setSchedules={setSchedules} setSnackOpen={setSnackOpen} />
      
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