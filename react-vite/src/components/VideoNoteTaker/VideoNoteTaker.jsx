import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./VideoNoteTaker.css";

function VideoNoteTaker() {
  const { notes } = useSelector((state) => state.videoDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleSaveNote = () => {
    // Dispatch action to save the note
    console.log("Note saved:", noteTitle, noteContent);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleClearNote = () => {
    setNoteTitle("");
    setNoteContent("");
  };

  return (
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
        <button onClick={handleRecord}>
          {isRecording ? "End Recording" : "Record"}
        </button>
      </div>
    </div>
  );
}

export default VideoNoteTaker;
