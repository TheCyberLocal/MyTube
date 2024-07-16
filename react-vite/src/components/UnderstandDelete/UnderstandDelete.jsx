import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteVideoThunk } from "../../redux/videoDetails";
import { useNavigate } from "react-router-dom";
import "./UnderstandDelete.css";

function UnderstandDelete({ type, element }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleDelete = () => {
    dispatch(deleteVideoThunk(element.id));
    closeModal();
    nav("/my-videos");
  };

  const getUnderstanding = () => {
    if (type === "Video") {
      return (
        <ul>
          <li>Your video ({element.title}) will be unrecoverable.</li>
          <li>The notes of this video will be deleted.</li>
          <li>The highlights of this video will be deleted.</li>
        </ul>
      );
    }
  };

  return (
    <div id="understand-delete">
      <h1>Are you absolutely sure?</h1>
      <h3>Understand the following:</h3>
      {getUnderstanding()}
      <h3>This is your last chance to keep your video.</h3>
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

export default UnderstandDelete;
