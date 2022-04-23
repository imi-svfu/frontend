import {Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { scheduleById } from "../../config";

const EditOptions = ({id, schedules, setSchedules, setSnackOpen}) => {
  const handleDeleteThen = (id) => {
    setSchedules(schedules.filter(item => item.id !== id))
    console.log("Удалено")
  }

  const deleteSchedule = (id) => {
    axios
      .delete(scheduleById(id))
      .then(({data}) => {
        console.log(data);
      })
      .then(
        handleDeleteThen(id)
      )
  }

  return (
    <div className="editOptions">
      <div className="editWrapper">
        <Tooltip title="Удалить">
          <IconButton onClick={() => deleteSchedule(id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Тест">
          <IconButton onClick={() => setSnackOpen(true)}>
            <AccessibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default EditOptions