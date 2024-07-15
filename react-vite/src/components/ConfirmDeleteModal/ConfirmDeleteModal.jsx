import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ConfirmDeleteAccountModal from "../ConfirmDeleteAccountModal";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ type, title, id = null }) {
  const { closeModal } = useModal();
  const { setModalContent } = useModal();

  const handleDelete = () => {
    if (type === "Account") {
      setModalContent(<ConfirmDeleteAccountModal />);
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
