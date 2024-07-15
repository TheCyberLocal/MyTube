import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import VideoNotes from "../VideoNotes";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const { video } = useSelector((state) => state.videoDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  const playerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    dispatch(fetchVideoDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (window.YT) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }
  }, [video?.url]);

  const createPlayer = () => {
    if (!video?.url) return;
    playerRef.current = new window.YT.Player("player", {
      videoId: video.url,
      playerVars: {
        autoplay: 0,
      },
    });
  };

  const handleRecord = () => {
    if (!isRecording) {
      const currentTime = getCurrentTime();
      setStartTime(currentTime);
      console.log("Recording started at: " + currentTime);
      setIsRecording(true);
    } else {
      const currentTime = getCurrentTime();
      setEndTime(currentTime);
      console.log("Recording ended at: " + currentTime);
      setIsRecording(false);
    }
  };

  const seekToTime = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  const getCurrentTime = () => {
    return playerRef.current ? playerRef.current.getCurrentTime() : 0;
  };

  if (!video) return null;

  return (
    <div className="video-details-page">
      <div className="left-column">
        <div className="video-container">
          <div id="player"></div>
        </div>
        <div className="video-info">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
        <VideoNotes />
      </div>
      <div className="right-column">
        <button onClick={handleRecord}>
          {isRecording ? "End Recording" : "Record"}
        </button>
        <div>
          <input
            type="number"
            placeholder="Enter time in seconds"
            onChange={(e) => seekToTime(parseInt(e.target.value))}
          />
        </div>
        {/* Right column content will be added in later steps */}
      </div>
    </div>
  );
}

export default VideoDetailsPage;
