import React, { useEffect } from "react";

const DateTime = props => {
  const [date, setDate] = React.useState("--/--/----");
  const [time, setTime] = React.useState("--:--");

  function tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[3] = ""; // remove seconds
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  useEffect(() => {
    // console.log('props.time', props.date)
    if (props.date && props.time) {
      let dateArr = props.date.split("-");
      setDate(dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0]);
      let timeArr = props.time.split(":");
      setTime(timeArr[0] + ":" + timeArr[1]);
    }
  }, []);

  return (
    <span>
      {date}
      <span
        style={{
          marginRight: 2,
          marginLeft: 2,
          color: "#e0e0e0"
        }}
      >
        |
      </span>
      {time}
    </span>
  );
};

export default DateTime;
