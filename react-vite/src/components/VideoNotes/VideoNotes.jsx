import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNoteThunk } from "../../redux/videoDetails";
import ConfirmDelete from "../ConfirmDelete";
import { useModal } from "../../context/Modal";
import { getTranslation } from "../../utils";
import "./VideoNotes.css";

function VideoNotes() {
  const { notes } = useSelector((state) => state.videoDetails);
  const { setModalContent } = useModal();
  const lang = useSelector((state) => state.session.language);

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    getTranslation(lang).then((func) => setT(() => func));
  }, [lang]);

  const [activeNote, setActiveNote] = useState(null);
  const [editableNote, setEditableNote] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [errors, setErrors] = useState({});
  const noteRefs = useRef([]);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [noteContent]);

  const handleNoteClick = (noteId, index) => {
    if (editableNote) return;

    setActiveNote(activeNote === noteId ? null : noteId);

    setTimeout(() => {
      noteRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }, 750); // Adjust the total duration as needed
  };

  const handleUpdateNote = (noteId) => {
    setEditableNote(noteId);
    const note = notes.find((note) => note.id === noteId);
    setNoteContent(note.description);
    setNoteTitle(note.title);
  };

  const handleDeleteNote = (noteId) => {
    const note = notes.find((note) => note.id === noteId);
    setModalContent(<ConfirmDelete type="note" element={note} />);
  };

  const handleSaveNote = (noteId) => {
    const newErrors = {};
    if (!noteTitle) newErrors.title = t("title_required");
    if (!noteContent) newErrors.description = t("content_required");
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(
        updateNoteThunk(noteId, {
          title: noteTitle,
          description: noteContent,
        })
      );
      setEditableNote(null);
    }
  };

  const handleCancelEdit = () => {
    setEditableNote(null);
  };

  if (!notes) return null;

  return (
    <div className="notes-section">
      {!notes.length ? (
        <h2>{t("no_notes_yet")}</h2>
      ) : (
        notes.map((note, index) => (
          <div
            key={note.id}
            ref={(el) => (noteRefs.current[index] = el)}
            className={`note-container ${
              activeNote === note.id ? "active" : ""
            }`}
          >
            {editableNote !== note.id && (
              <div
                className="note-header"
                onClick={() => handleNoteClick(note.id, index)}
              >
                <h3>{note.title}</h3>
                <span>{new Date(note.updated_at).toLocaleDateString()}</span>
              </div>
            )}
            <div className="note-content">
              {editableNote === note.id ? (
                <div>
                  <h3>{t("title")}</h3>
                  <input
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder={errors.title ? t("title_required") : ""}
                    spellCheck="true"
                  />
                  <h3>{t("description")}</h3>
                  <textarea
                    ref={textareaRef}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={{ overflow: "hidden", resize: "none" }}
                    placeholder={
                      errors.description ? t("content_required") : ""
                    }
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
                      {t("save")}
                    </button>
                    <button onClick={handleCancelEdit}>{t("cancel")}</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUpdateNote(note.id)}>
                      {t("update")}
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      {t("delete")}
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
