import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onSelectDate }) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
        onSelectDate(date); // Calling the passed prop function
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                inline
                dateFormat="yyyy/MM/dd"
            />
        </div>
    );
};

export default Calendar;
