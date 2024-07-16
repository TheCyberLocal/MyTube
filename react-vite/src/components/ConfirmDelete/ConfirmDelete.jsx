import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import UnderstandDelete from "../UnderstandDelete";
import {
  deleteNoteThunk,
  deleteHighlightThunk,
} from "../../redux/videoDetails";
import "./ConfirmDelete.css";

function ConfirmDelete({ type, element = null }) {
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === "Account") {
      setModalContent(<UnderstandDelete type="Account" element={element} />);
    } else if (type === "Note") {
      dispatch(deleteNoteThunk(element.id));
      closeModal();
    } else if (type === "Video") {
      setModalContent(<UnderstandDelete type="Video" element={element} />);
    } else if (type === "Highlight") {
      dispatch(deleteHighlightThunk(element.id));
      closeModal();
    }
  };

  const getName = () => {
    if (type === "Account") return element.username;
    return element.title;
  };

  return (
    <div id="prompt-modal">
      <h1>Confirm Delete of</h1>
      <h3>
        {type} - {getName()}
      </h3>
      <h3>Are you sure you don't want this?</h3>
      <div className="row">
        <button onClick={handleDelete} id="yes">
          Delete
        </button>
        <button onClick={closeModal} id="no">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
