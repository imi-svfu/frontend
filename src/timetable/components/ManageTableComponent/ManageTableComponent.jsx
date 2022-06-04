import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import Paper from '@mui/material/Paper';
import EditOptions from '../EditOptions/EditOptions';
import styles from './ManageTableComponent.module.scss';

const ManageTableComponent = ({schedules, setSchedules, setSnackOpen, setFormOpen, setWeekDay, setPairNum, setEditScheduleId}) => {

  const addButtonValue = (cellSchedules) => {
    let out = true

    if (cellSchedules[0].repeat_option === 0 && !cellSchedules[0].subgroup) out=false

    cellSchedules.map(item => {
      if (item.subgroup && item.repeat_option !== 0) out = false
    })

    return out
  }

  return (
    <TableContainer sx={{marginBottom: '100px'}} component={Paper}>
      <Table aria-label="simple table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Понедельник</TableCell>
            <TableCell>Вторник</TableCell>
            <TableCell>Среда</TableCell>
            <TableCell>Четверг</TableCell>
            <TableCell>Пятница</TableCell>
            <TableCell>Суббота</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.rightGrayBorder}>Пара</TableCell>
            {[...Array(6).keys()].map(i => (
              <>
                <TableCell className={styles.rightGrayBorder}>
                  <div className={styles.cellWrapper}>
                    <div>Занятие</div>
                    <div>Вид</div>
                    <div>Каб</div>
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
                <TableCell className={styles.rightGrayBorder}>{i + 1}</TableCell>
                {[...Array(6).keys()].map(j => {
                  const cellSchedules = schedules.filter(schedule => schedule.week_day == j + 1 && schedule.pair_num == i + 1)
                  if (cellSchedules.length) {
                    return <>
                      <TableCell className={styles.rightGrayBorder}>
                        <div className={styles.cellWrapper}>
                          {cellSchedules.map(schedule => {
                          return<>
                          <div className={`${styles.bodyCell} ${styles.bodyLessonCell}`}>
                            <div className={styles.editWrapper}>
                              <EditOptions
                                //todo исправить ограничение добавления графика занятий по подгруппам

                                className={styles.editOptions}

                                // addButton={addButtonValue(cellSchedules)}
                                addButton={true}
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
                                setEditScheduleId={setEditScheduleId}
                              />
                            </div>
                            {schedule.lesson.subject}{schedule.subgroup && `(1/${schedule.lesson.group.subgroups})`}
                            {(() => {switch (schedule.repeat_option) {
                              case 1:
                                return ("*");
                              case 2:
                                return ("**");
                              default:
                                return ("");
                            }})()}
                          </div>
                          <div className={`${styles.bodyCell} ${styles.bodyTypeCell}`}>
                            {schedule.type}
                          </div>
                          <div className={`${styles.bodyCell} ${styles.bodyCabCell}`}>
                            {schedule.room.num}
                          </div>
                        </>
                      })}
                        </div>
                      </TableCell>
                    </>
                  } else {
                    return <>
                      <TableCell className={styles.rightGrayBorder}>
                        <div className={styles.cellWrapper}>
                          <div className={`${styles.bodyCell} ${styles.bodyLessonCell}`}>
                            <div className={styles.editWrapper}>
                              <EditOptions

                                className={styles.editOptions}

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
                            </div>
                            -----
                          </div>
                          <div className={styles.bodyTypeCell}>--</div>
                          <div className={styles.bodyCabCell}>--</div>
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