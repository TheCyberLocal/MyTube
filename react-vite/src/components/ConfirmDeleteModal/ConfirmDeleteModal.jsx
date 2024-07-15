import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import UnderstandDeleteAccount from "../UnderstandDeleteAccount";
import ConfirmDeleteVideoModal from "../ConfirmDeleteVideoModal";
import { deleteNoteThunk } from "../../redux/videoDetails";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ type, element = null }) {
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === "Account") {
      setModalContent(<UnderstandDeleteAccount />);
    } else if (type === "Note") {
      dispatch(deleteNoteThunk(element.id));
      closeModal();
    } else if (type === "Video") {
      setModalContent(<ConfirmDeleteVideoModal element={element} />);
    } else if (type === "Highlight") {
    }
  };

  const getName = () => {
    if (element?.title) return element.title; // videos or notes
    if (element?.username) return element.username; // account
    return element.name; // highlights
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

export default ConfirmDeleteModal;
