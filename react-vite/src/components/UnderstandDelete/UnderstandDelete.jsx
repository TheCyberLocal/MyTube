import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteVideoThunk } from "../../redux/videoDetails";
import { useNavigate } from "react-router-dom";
import "./UnderstandDelete.css";
import AlertChange from "../AlertChange";

function UnderstandDelete({ type, element }) {
  const { closeModal, setModalContent } = useModal();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleDelete = () => {
    if (type === "video") {
      dispatch(deleteVideoThunk(element.id));
      setModalContent(
        <AlertChange message="alert_video_deleted" />,
      );
      nav("/my-videos");
    } else if (type === "account") {
      dispatch(thunkDeleteUser(user.id));
      setModalContent(
        <AlertChange message="alert_goodbye" />,
      );
      nav("/");
    }
  };

  const getUnderstanding = () => {
    if (type === "video") {
      return (
        <ul>
          <li>Your video ({element.title}) will be unrecoverable.</li>
          <li>The notes of this video will be deleted.</li>
          <li>The highlights of this video will be deleted.</li>
        </ul>
      );
    } else if (type === "account") {
      return (
        <ul>
          <li>Your account ({element.email}) will be unrecoverable.</li>
          <li>Your ({element.videoCount}) videos will no longer be saved.</li>
          <li>The notes of all videos will be deleted.</li>
          <li>The highlights of all videos will be deleted.</li>
          <li>Your account settings will be deleted.</li>
          <li>Your personal information will be deleted.</li>
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
