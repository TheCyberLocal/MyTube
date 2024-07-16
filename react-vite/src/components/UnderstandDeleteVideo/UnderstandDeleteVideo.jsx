import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteVideoThunk } from "../../redux/videoDetails";
import { useNavigate } from "react-router-dom";
import "./UnderstandDeleteVideo.css";

function UnderstandDeleteVideo({ element }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleDelete = () => {
    dispatch(deleteVideoThunk(element.id));
    closeModal();
    nav("/my-videos");
  };

  return (
    <div id="confirm-delete-video-modal">
      <h1>Are you absolutely sure?</h1>
      <h3>Understand the following:</h3>
      <ul>
        <li>Your video ({element.title}) will be unrecoverable.</li>
        <li>The notes of this video will be deleted.</li>
        <li>The highlights of this video will be deleted.</li>
      </ul>
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

export default UnderstandDeleteVideo;
