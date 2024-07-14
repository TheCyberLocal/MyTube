import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { fetchVideoDetails } from "../../redux/videoDetails";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const {
    user: sessionUser,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSelector((state) => state.session);
  const {
    searchResults: myVideos,
    isLoading: myVideosLoading,
    error: myVideosError,
  } = useSelector((state) => state.myVideos);
  const {
    video,
    notes,
    highlights,
    isLoading: videoDetailsLoading,
    error: videoDetailsError,
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

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const handleRecord = () => {
    if (!isRecording) {
      const currentTime = player.getCurrentTime();
      setStartTime(currentTime);
      console.log("Recording started at: " + currentTime);
      setIsRecording(true);
    } else {
      const currentTime = player.getCurrentTime();
      setEndTime(currentTime);
      console.log("Recording ended at: " + currentTime);
      console.log(
        "Recorded duration: " + (currentTime - startTime) + " seconds"
      );
      setIsRecording(false);
    }
  };

  if (videoDetailsLoading || !video) return null;

  return (
    <div className="video-details-page">
      <div className="left-column">
        <div className="video-container">
          <YouTube videoId={video.url} onReady={onPlayerReady} />
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
        {/* Right column content will be added in later steps */}
      </div>
    </div>
  );
}

export default VideoDetailsPage;
