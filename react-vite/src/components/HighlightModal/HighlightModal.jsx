import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createHighlightThunk,
  updateHighlightThunk,
} from "../../redux/videoDetails";
import "./HighlightModal.css";

function HighlightModal({ start, end, id = null }) {
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const video = useSelector((state) => state.videoDetails.video);
  const dispatch = useDispatch();

  const convertHMSToSeconds = ({ hours, minutes, seconds }) => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const convertSecondsToHMS = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { hours, minutes, seconds };
  };

  const [startTime, setStartTime] = useState(convertSecondsToHMS(start));
  const [endTime, setEndTime] = useState(convertSecondsToHMS(end));

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
    const start_time = convertHMSToSeconds(startTime);
    const end_time = convertHMSToSeconds(endTime);
    if (type === "Create") {
      dispatch(
        createHighlightThunk({
          video_id: video.id,
          title,
          start_time,
          end_time,
        })
      );
    } else if (type === "Update") {
      dispatch(
        updateHighlightThunk(id, {
          title,
          start_time,
          end_time,
        })
      );
    }
    closeModal();
  };

  return (
    <div id="highlight-modal">
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

export default HighlightModal;
