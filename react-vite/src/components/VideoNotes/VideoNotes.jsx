import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./VideoNotes.css";

function VideoNotes() {
  const { notes } = useSelector((state) => state.videoDetails);

  const [activeNote, setActiveNote] = useState(null);
  const [editableNote, setEditableNote] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const noteRefs = useRef([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [noteContent]);

  const handleNoteClick = (noteId, index) => {
    if (editableNote) return;

    setActiveNote(activeNote === noteId ? null : noteId);

    const scrollInterval = setInterval(() => {
      noteRefs.current[index].scrollIntoView();
    }, 10); // Adjust the interval time as needed

    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 1000); // Adjust the total duration as needed
  };

  const handleUpdateNote = (noteId) => {
    setEditableNote(noteId);
    const note = notes.find((note) => note.id === noteId);
    setNoteContent(note.description);
    setNoteTitle(note.title);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  const handleSaveNote = (noteId) => {
    dispatch(
      updateNote({
        id: noteId,
        title: noteTitle,
        description: noteContent,
      })
    );
    setEditableNote(null);
  };

  const handleCancelEdit = () => {
    setEditableNote(null);
  };

  return (
    <div className="notes-section">
      {!notes.length ? (
        <h2>No notes yet... how about taking some?</h2>
      ) : (
        notes.map((note, index) => (
          <div
            key={note.id}
            ref={(el) => (noteRefs.current[index] = el)}
            className={`note-container ${
              activeNote === note.id ? "active" : ""
            }`}
          >
            <div
              className="note-header"
              onClick={() => handleNoteClick(note.id, index)}
            >
              {editableNote === note.id ? (
                <div>
                  <h3>Title</h3>
                  <input
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    spellCheck="true"
                  />
                </div>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                </>
              )}
            </div>
            <div className="note-content">
              {editableNote === note.id ? (
                <div>
                  <h3>Description</h3>
                  <textarea
                    ref={textareaRef}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={{ overflow: "hidden", resize: "none" }}
                    spellCheck="true"
                  />
                </div>
              ) : (
                <p>{note.description}</p>
              )}
              <div className="note-buttons">
                {editableNote === note.id ? (
                  <>
                    <button onClick={() => handleSaveNote(note.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUpdateNote(note.id)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoNotes;
