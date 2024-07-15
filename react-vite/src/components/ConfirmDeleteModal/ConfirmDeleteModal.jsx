import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ConfirmDeleteAccountModal from "../ConfirmDeleteAccountModal";
import { deleteNoteThunk } from "../../redux/videoDetails";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ type, title, id = null }) {
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === "Account") {
      setModalContent(<ConfirmDeleteAccountModal />);
    } else if (type === "Note") {
      dispatch(deleteNoteThunk(id));
      closeModal();
    }
  };

  return (
    <div id="prompt-modal">
      <h1>Confirm Delete of</h1>
      <h2>
        {type} - {title}
      </h2>
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
