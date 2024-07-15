import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const {
    video,
    notes,
    isLoading: videoDetailsLoading,
  } = useSelector((state) => state.videoDetails);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [player, setPlayer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [activeNote, setActiveNote] = useState(null);

  const noteRefs = useRef([]);

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
  }, [video]);

  const createPlayer = () => {
    setPlayer(
      new window.YT.Player("player", {
        videoId: video.url,
        playerVars: {
          autoplay: 0,
        },
      })
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

  const handleNoteClick = (noteId, index) => {
    setActiveNote(activeNote === noteId ? null : noteId);

    const scrollInterval = setInterval(() => {
      noteRefs.current[index].scrollIntoView();
    }, 10); // Adjust the interval time as needed

    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 1000); // Adjust the total duration as needed
  };

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
        <div className="notes-section">
          {notes.length === 0 ? (
            <h3>No notes yet... how about taking some?</h3>
          ) : (
            notes.map((note, index) => (
              <div
                key={note.id}
                ref={(el) => (noteRefs.current[index] = el)}
                className={`note-container ${
                  activeNote === note.id ? "active" : ""
                }`}
                onClick={() => handleNoteClick(note.id, index)}
              >
                <div className="note-header">
                  <h4>{note.title}</h4>
                  <span>{new Date(note.created_at).toLocaleDateString()}</span>
                </div>
                <div className="note-content">
                  <p>{note.description}</p>
                  <div className="note-buttons">
                    <button onClick={() => handleUpdateNote(note.id)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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
