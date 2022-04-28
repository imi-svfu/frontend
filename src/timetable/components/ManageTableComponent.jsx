import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import Paper from '@mui/material/Paper';
import EditOptions from './EditOptions';

const styles = {
  rightGrayBorder: {
    borderRight: '1px solid rgba(224, 224, 224, 1);'
  }
}

const ManageTableComponent = ({schedules, setSchedules, setSnackOpen, setFormOpen, setWeekDay, setPairNum}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{overflow: 'auto'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Понедельник</TableCell>
            <TableCell align="center">Вторник</TableCell>
            <TableCell align="center">Среда</TableCell>
            <TableCell align="center">Четверг</TableCell>
            <TableCell align="center">Пятница</TableCell>
            <TableCell align="center">Суббота</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.rightGrayBorder}>Пара</TableCell>
            {[...Array(6).keys()].map(i => (
              <>
                <TableCell sx={styles.rightGrayBorder}>
                  <div className="CellWrapper">
                    <div className="headLessonCell">Занятие</div>
                    <div className="headTypeCell">Вид</div>
                    <div className="headCabCell">Каб</div>
                  </div>
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(6).keys()].map(i => (
            <>
              <TableRow>
                <TableCell sx={styles.rightGrayBorder}>{i + 1}</TableCell>
                {[...Array(6).keys()].map(j => {
                  const cellSchedules = schedules.filter(schedule => schedule.week_day == j + 1 && schedule.pair_num == i + 1)
                  if (cellSchedules.length) {
                    return <>
                      <TableCell sx={styles.rightGrayBorder}>
                        <div className="CellWrapper">
                          {cellSchedules.map(schedule => {
                          return<>
                          <div className="bodyCell bodyLessonCell">
                            <EditOptions
                              addButton={cellSchedules.length<2 && cellSchedules[0].repeat_option!==0}
                              deleteButton={true}
                              id={schedule.id}
                              schedules={schedules}
                              setSchedules={setSchedules}
                              setSnackOpen={setSnackOpen}
                              setFormOpen={setFormOpen}
                              weekDay={j + 1}
                              pairNum={i + 1}
                              setWeekDay={setWeekDay}
                              setPairNum={setPairNum}
                            />
                            {schedule.lesson.subject}
                            {(() => {switch (schedule.repeat_option) {
                              case 1:
                                return ("*");
                              case 2:
                                return ("**");
                              default:
                                return ("");
                            }})()}
                          </div>
                          <div className="bodyCell bodyTypeCell">
                            {schedule.type}
                          </div>
                          <div className="bodyCell bodyCabCell">
                            {schedule.room.num}
                          </div>
                        </>
                      })}
                        </div>
                      </TableCell>
                    </>
                  } else {
                    return <>
                      <TableCell sx={styles.rightGrayBorder}>
                        <div className="CellWrapper">
                          <div className="bodyLessonCell">
                            <EditOptions
                              addButton={true}
                              deleteButton={false}
                              schedules={schedules}
                              setSchedules={setSchedules}
                              setSnackOpen={setSnackOpen}
                              setFormOpen={setFormOpen}
                              weekDay={j + 1}
                              pairNum={i + 1}
                              setWeekDay={setWeekDay}
                              setPairNum={setPairNum}
                            />
                            -----
                          </div>
                          <div className="bodyTypeCell">--</div>
                          <div className="bodyCabCell">--</div>
                        </div>
                      </TableCell>
                    </>
                  }
                })}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ManageTableComponent