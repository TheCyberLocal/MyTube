import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createHighlightThunk,
  updateHighlightThunk,
} from "../../redux/videoDetails";
import "./HighlightModal.css";

function HighlightModal({
  type,
  start,
  end,
  highlight = null,
  videoDuration = null,
}) {
  const { closeModal } = useModal();
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

  const [title, setTitle] = useState(highlight?.title ?? "");
  const [startTime, setStartTime] = useState(
    convertSecondsToHMS(highlight?.start_time ?? start)
  );
  const [endTime, setEndTime] = useState(
    convertSecondsToHMS(highlight?.end_time ?? end)
  );

  const handleTimeChange = (e, type, timeType) => {
    const maxTime = convertSecondsToHMS(videoDuration);
    // Get new form value but default with zero
    let value = parseInt(e.target.value) || 0;
    // Determine whether the start time or the end time is being updated
    const time = type === "start" ? { ...startTime } : { ...endTime };

    // Process seconds change
    if (timeType === "seconds") {
      const minutesMaxed = time.minutes === maxTime.minutes;
      const hoursMaxed = time.hours === maxTime.hours;
      const secondsExceeded = value > maxTime.seconds;

      // Guard against exceeding video duration
      if (secondsExceeded && minutesMaxed && hoursMaxed) return;

      if (value > 59) {
        // Step up seconds
        time.seconds = 0;
        time.minutes += 1;
      } else if (value < 0) {
        // Step down seconds
        if (time.minutes > 0) {
          // - if minutes can step down
          time.seconds = 59;
          time.minutes -= 1;
        } else if (time.hours > 0) {
          // - else step down seconds and minutes if hours can step down
          time.seconds = 59;
          time.minutes = 59;
          time.hours -= 1;
        }
      } else {
        // Not a step, value is 0 to 59
        time.seconds = value;
      }
    }

    // Process minutes change
    if (timeType === "minutes") {
      const minutesMaxed = value === maxTime.minutes;
      const hoursMaxed = time.hours === maxTime.hours;
      const secondsExceeded = time.seconds > maxTime.seconds;
      const minutesExceeded = value > maxTime.minutes;

      // Guard against exceeding video duration
      if (hoursMaxed && minutesExceeded) return;

      // If minutes maxed when seconds exceed set seconds to max and
      if (hoursMaxed && minutesMaxed && secondsExceeded) {
        time.seconds = maxTime.seconds;
      }

      if (value > 59) {
        // Step up minutes
        time.minutes = 0;
        time.hours += 1;
      } else if (value < 0) {
        // Step down seconds
        if (time.hours > 0) {
          // - if hours can step down
          time.minutes = 59;
          time.hours -= 1;
        }
      } else {
        // Not a step, value is 0 to 59
        time.minutes = value;
      }
    }

    // Process hours change
    if (timeType === "hours") {
      const minutesMaxed = time.minutes === maxTime.minutes;
      const hoursMaxed = value === maxTime.hours;
      const secondsExceeded = time.seconds > maxTime.seconds;
      const minutesExceeded = time.minutes > maxTime.minutes;
      const hoursExceeded = value > maxTime.hours;
      const isPositive = value >= 0;

      // If hours maxed when seconds maxed and seconds exceeded set seconds to max
      if (hoursMaxed && minutesMaxed && secondsExceeded)
        time.seconds = maxTime.seconds;
      // If hours maxed and both minutes and seconds exceeded set them to max
      if (hoursMaxed && minutesExceeded) {
        time.seconds = maxTime.seconds;
        time.minutes = maxTime.minutes;
      }
      // If total time exceeds set to max
      if (hoursExceeded) time = maxTime;

      // Only update if value is 0 or more
      if (isPositive) time.hours = value;
    }

    if (type === "start") {
      // Set start to processed time
      setStartTime(time);
      const startHoursAfterEnd = time.hours > endTime.hours;
      const startHoursAtEnd = time.hours === endTime.hours;
      const startMinutesAfterEnd = time.minutes > endTime.minutes;
      const startMinutesAtEnd = time.minutes === endTime.minutes;
      const startSecondsAfterEnd = time.seconds > endTime.seconds;
      // Set end to start when start is after end
      if (
        startHoursAfterEnd ||
        (startHoursAtEnd && startMinutesAfterEnd) ||
        (startHoursAtEnd && startMinutesAtEnd && startSecondsAfterEnd)
      ) {
        setEndTime(time);
      }
    } else {
      // Set end to processed time
      setEndTime(time);
      const endHoursBeforeEnd = time.hours < startTime.hours;
      const endHoursAtStart = time.hours === startTime.hours;
      const endMinutesBeforeStart = time.minutes < startTime.minutes;
      const endMinutesAtStart = time.minutes === startTime.minutes;
      const endSecondsBeforeStart = time.seconds < startTime.seconds;
      // Set start to end when end is before start
      if (
        endHoursBeforeEnd ||
        (endHoursAtStart && endMinutesBeforeStart) ||
        (endHoursAtStart && endMinutesAtStart && endSecondsBeforeStart)
      ) {
        setStartTime(time);
      }
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
        updateHighlightThunk(highlight.id, {
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
      <h1>{type} Highlight</h1>
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
