import {Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import {scheduleById} from "../../../config";
import styles from './EditOptions.module.scss';

const EditOptions =
  ({
     addButton,
     deleteButton,
     id,
     schedules,
     setSchedules,
     setSnackOpen,
     setFormOpen,
     weekDay,
     pairNum,
     setWeekDay,
     setPairNum,
     setEditScheduleId
   }) => {
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

    const handleAddClick = () => {
      setFormOpen(true);
      setWeekDay(weekDay);
      setPairNum(pairNum);
    }

    const handleEditClick = () => {
      setFormOpen(true);
      setPairNum(pairNum);
      setWeekDay(weekDay);
      setEditScheduleId(id);
    }

    return (
      <div className={styles.editOptions}>
        <div className={styles.editWrapper}>
          {deleteButton &&
            <Tooltip title="Удалить">
              <IconButton onClick={() => deleteSchedule(id)}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Тест">
            <IconButton onClick={() => setSnackOpen(true)}>
              <AccessibilityIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
          {addButton &&
            <Tooltip title="Добавить">
              <IconButton onClick={handleAddClick}>
                <AddCircleOutlineIcon fontSize="small"/>
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Редактировать">
            <IconButton onClick={() => handleEditClick()}>
              <EditIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }

export default EditOptions