import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import { useModal } from "../../context/Modal";
import VideoNotes from "../VideoNotes";
import ConfirmDelete from "../ConfirmDelete";
import HighlightModal from "../HighlightModal";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const { video, highlights } = useSelector((state) => state.videoDetails);
  const { setModalContent } = useModal();
  const { id } = useParams();
  const dispatch = useDispatch();

  const playerRef = useRef(null);
  const videoTimeRef = useRef(null);
  const [recording, setRecording] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

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

  const convertSecondsToHMSString = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

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
    if (recording === null) {
      setRecording(playerRef.current.getCurrentTime());
      playerRef.current.playVideo();
    } else {
      setModalContent(
        <HighlightModal
          type="Create"
          start={recording}
          end={playerRef.current.getCurrentTime()}
          videoDuration={playerRef.current.playerInfo.duration}
        />
      );
      playerRef.current.pauseVideo();
      setRecording(null);
    }
  };

  const handleUpdateHighlight = (highlightId) => {
    const highlightToUpdate = highlights.find(
      (highlight) => highlight.id === highlightId
    );
    setModalContent(
      <HighlightModal
        type="Update"
        highlight={highlightToUpdate}
        videoDuration={playerRef.current.playerInfo.duration}
      />
    );
  };

  const handleDeleteHighlight = (highlight) => {
    setModalContent(<ConfirmDelete type="Highlight" element={highlight} />);
  };

  const handleUpdateVideo = () => {
    return;
    // setModalContent<HighlightModal type="Update" />
  };

  const handleDeleteVideo = () => {
    setModalContent(<ConfirmDelete type="Video" element={video} />);
  };

  const handleSaveNote = () => {
    // Dispatch action to save the note
    if (!noteTitle || !noteContent) {
      alert("Notes must contain both a title and content.");
    } else {
      console.log("Note saved:", noteTitle, noteContent);
      setNoteTitle("");
      setNoteContent("");
    }
  };

  const handleClearNote = () => {
    setNoteTitle("");
    setNoteContent("");
  };

  const handleHighlightClick = (highlight) => {
    videoTimeRef.current = highlight.start_time;
    playerRef.current.seekTo(highlight.start_time, true);
    playerRef.current.playVideo();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const interval = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime();
      const isEndOfHighlight = currentTime >= highlight.end_time;
      const isManualChange = Math.abs(currentTime - videoTimeRef.current) > 1;

      if (isEndOfHighlight) playerRef.current.pauseVideo();

      if (isManualChange || isEndOfHighlight) {
        videoTimeRef.current = null;
        clearInterval(interval);
      } else {
        videoTimeRef.current = currentTime;
      }
    }, 500);
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
        <div className="note-taker">
          <h3>Note Taker</h3>
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Let's take a note..."
          />
          <div className="note-taker-buttons">
            <button onClick={handleSaveNote}>Save</button>
            <button onClick={handleClearNote}>Clear</button>
            <button
              onClick={handleRecord}
              className={recording === null ? "" : "red-button"}
            >
              {recording === null ? "Record" : "Stop"}
            </button>
          </div>
        </div>
        <div className="highlights-section">
          <h3>Highlights</h3>
          <div className="highlight-list">
            {highlights.length === 0 ? (
              <p>No highlights yet...</p>
            ) : (
              highlights
                .sort((a, b) => a.start_time - b.start_time)
                .map((highlight) => (
                  <div key={highlight.id} className="highlight-container">
                    <div className="highlight-header">
                      <span
                        className="highlight-timestamp"
                        onClick={() => handleHighlightClick(highlight)}
                      >
                        {`${convertSecondsToHMSString(
                          highlight.start_time
                        )} - ${convertSecondsToHMSString(highlight.end_time)}`}
                      </span>
                      <span>
                        {new Date(highlight.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="highlight-title">{highlight.title}</div>
                    <div className="highlight-buttons">
                      <button
                        onClick={() => handleUpdateHighlight(highlight.id)}
                        id="left-highlight-button"
                      >
                        Update
                      </button>
                      <button onClick={() => handleDeleteHighlight(highlight)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        <div id="video-buttons">
          <button id="video-update-button" onClick={handleUpdateVideo}>
            Update video
          </button>
          <button id="video-delete-button" onClick={handleDeleteVideo}>
            Delete video
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsPage;
