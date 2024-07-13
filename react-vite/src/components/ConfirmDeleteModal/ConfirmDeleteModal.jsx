import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ type, title }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    closeModal();
    // dispatch(deleteThunk());
  };

  return (
    <div id="confirm-delete-modal">
      <h1>Confirm Delete of</h1>
      <h2>
        {type} - {title}
      </h2>
      <h3>Are you sure you want to remove this?</h3>
      <div className="row">
        <button onClick={handleDelete} id="yes">
          Delete
        </button>
        <button onClick={closeModal} id="no">
          Keep
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
