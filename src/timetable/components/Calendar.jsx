import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";

const Calendar = ({selected, setSelected}) => {
    return(<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={selected}
            onChange={(newValue) => {
                setSelected(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>);
}

export default Calendar;