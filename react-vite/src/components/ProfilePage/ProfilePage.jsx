import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
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

  if (!sessionLoading && !sessionUser)
    return <Navigate to="/" replace={true} />;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <>
        <p>Username: {sessionUser.username}</p>
        <p>Email: {sessionUser.email}</p>
        <p>Theme: {sessionUser.theme}</p>
        <p>Language: {sessionUser.language}</p>
      </>
    </div>
  );
}

export default ProfilePage;
