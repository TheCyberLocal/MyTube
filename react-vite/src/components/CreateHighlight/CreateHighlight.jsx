import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./CreateHighlight.css";

function CreateHighlight({ start, end }) {
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(convertSecondsToHMS(start));
  const [endTime, setEndTime] = useState(convertSecondsToHMS(end));

  function convertSecondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { hours, minutes, seconds };
  }

  const handleTimeChange = (e, type, timeType) => {
    let value = parseInt(e.target.value) || 0;
    const time = type === "start" ? { ...startTime } : { ...endTime };

    if (timeType === "seconds") {
      if (value > 59) {
        time.seconds = 0;
        time.minutes += 1;
      } else if (value < 0) {
        if (time.minutes > 0) {
          time.seconds = 59;
          time.minutes -= 1;
        } else if (time.hours > 0) {
          time.seconds = 59;
          time.minutes = 59;
          time.hours -= 1;
        } else {
          time.seconds = 0;
        }
      } else {
        time.seconds = value;
      }
    }

    if (timeType === "minutes") {
      if (value > 59) {
        time.minutes = 0;
        time.hours += 1;
      } else if (value < 0) {
        if (time.hours > 0) {
          time.minutes = 59;
          time.hours -= 1;
        } else {
          time.minutes = 0;
        }
      } else {
        time.minutes = value;
      }
    }

    if (timeType === "hours") {
      time.hours = Math.max(0, value);
    }

    if (type === "start") {
      setStartTime(time);
      if (
        time.hours > endTime.hours ||
        (time.hours === endTime.hours && time.minutes > endTime.minutes) ||
        (time.hours === endTime.hours &&
          time.minutes === endTime.minutes &&
          time.seconds > endTime.seconds)
      ) {
        setEndTime({ ...time });
      }
    } else {
      if (
        time.hours < startTime.hours ||
        (time.hours === startTime.hours && time.minutes < startTime.minutes) ||
        (time.hours === startTime.hours &&
          time.minutes === startTime.minutes &&
          time.seconds < startTime.seconds)
      ) {
        return;
      }
      setEndTime(time);
    }
  };

  const handleSaveHighlight = () => {
    // Implement the save functionality here
    console.log("Saving highlight", { title, startTime, endTime });
    closeModal();
  };

  return (
    <div id="create-highlight">
      <h1>Create Highlight</h1>
      <div className="highlight-inputs">
        <label htmlFor="highlight-title">Title</label>
        <input
          type="text"
          id="highlight-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="time-inputs">
          <div className="time-input">
            <label htmlFor="start-time">Start time</label>
            <div className="time-selectors">
              <input
                type="number"
                name="start-hours"
                value={startTime.hours}
                onChange={(e) => handleTimeChange(e, "start", "hours")}
              />
              <span>:</span>
              <input
                type="number"
                name="start-minutes"
                value={startTime.minutes}
                onChange={(e) => handleTimeChange(e, "start", "minutes")}
              />
              <span>:</span>
              <input
                type="number"
                name="start-seconds"
                value={startTime.seconds}
                onChange={(e) => handleTimeChange(e, "start", "seconds")}
              />
            </div>
          </div>
          <div className="time-input">
            <label htmlFor="end-time">End time</label>
            <div className="time-selectors">
              <input
                type="number"
                name="end-hours"
                value={endTime.hours}
                onChange={(e) => handleTimeChange(e, "end", "hours")}
              />
              <span>:</span>
              <input
                type="number"
                name="end-minutes"
                value={endTime.minutes}
                onChange={(e) => handleTimeChange(e, "end", "minutes")}
              />
              <span>:</span>
              <input
                type="number"
                name="end-seconds"
                value={endTime.seconds}
                onChange={(e) => handleTimeChange(e, "end", "seconds")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="highlight-buttons">
        <button onClick={handleSaveHighlight}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateHighlight;
