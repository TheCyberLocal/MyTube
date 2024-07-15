import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  // const {
  //   user: sessionUser,
  //   isLoading: sessionLoading,
  // } = useSelector((state) => state.session);
  const {
    video,
    // notes,
    // highlights,
    isLoading: videoDetailsLoading,
  } = useSelector((state) => state.videoDetails);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [player, setPlayer] = useState(null);
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
  });

  const createPlayer = () => {
    setPlayer(
      new window.YT.Player("player", {
        videoId: video.url,
        playerVars: {
          autoplay: 0,
        },
      }),
    );
  };

  const handleRecord = () => {
    if (!isRecording) {
      const currentTime = getCurrentTime();
      setStartTime(currentTime);
      console.log("Recording started at: " + startTime);
      setIsRecording(true);
    } else {
      const currentTime = getCurrentTime();
      setEndTime(currentTime);
      console.log("Recording ended at: " + endTime);
      setIsRecording(false);
    }
  };

  const seekToTime = (time) => player.seekTo(time, true);
  const getCurrentTime = () => player.getCurrentTime();

  if (videoDetailsLoading || !video) return null;

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
