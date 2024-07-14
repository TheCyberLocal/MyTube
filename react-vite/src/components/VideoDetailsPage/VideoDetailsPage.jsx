import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const {
    user: sessionUser,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSelector((state) => state.session);
  const {
    searchResults: myVideos = [],
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

  useEffect(() => {
    dispatch(fetchVideoDetails(id));
  }, [dispatch, id]);

  if (!video) return null;

  return (
    <div className="video-details-page">
      <div className="left-column">
        <div className="video-container">
          <iframe
            width="100%"
            height="auto"
            src={`https://www.youtube.com/embed/${video.url}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-info">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
      </div>
      <div className="right-column"></div>
    </div>
  );
}

export default VideoDetailsPage;
