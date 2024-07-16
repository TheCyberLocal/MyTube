import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../../redux/videoDetails";
import { useModal } from "../../context/Modal";
import VideoNotes from "../VideoNotes";
import ConfirmDelete from "../ConfirmDelete";
import CreateHighlight from "../CreateHighlight";
import "./VideoDetailsPage.css";

function VideoDetailsPage() {
  const { video, highlights } = useSelector((state) => state.videoDetails);
  const { setModalContent } = useModal();
  const { id } = useParams();
  const dispatch = useDispatch();

  const playerRef = useRef(null);
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
        <CreateHighlight
          start={recording}
          end={playerRef.current.getCurrentTime()}
        />
      );
      playerRef.current.pauseVideo();
      setRecording(null);
    }
  };

  const handleUpdateVideo = () => {
    return;
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
                        onClick={() =>
                          handleHighlightClick(highlight.start_time)
                        }
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
                      <button id="left-highlight-button">Update</button>
                      <button>Delete</button>
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
