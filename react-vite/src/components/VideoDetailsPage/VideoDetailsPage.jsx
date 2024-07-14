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
        <div className="notes-section">
          {notes.length === 0 ? (
            <h3>No notes yet... how about taking some?</h3>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-container">
                <div
                  className="note-header"
                  onClick={() => handleNoteEdit(note.id)}
                >
                  <h4>{note.title}</h4>
                  <span>{`noted on ${new Date(
                    note.created_at
                  ).toLocaleDateString()}`}</span>
                </div>
                {activeNote === note.id && (
                  <div className="note-content">
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                    />
                    <button onClick={handleNoteSave}>Save</button>
                    <button onClick={handleNoteCancel}>Cancel</button>
                  </div>
                )}
                {activeNote !== note.id && (
                  <div className="note-buttons">
                    <button onClick={() => handleNoteEdit(note.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleNoteDelete(note.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="right-column"></div>
    </div>
  );
}

export default VideoDetailsPage;
