import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteUser } from "../../redux/session";
import AlertChange from "../AlertChange";
import "./UnderstandDeleteAccount.css";
import { useNavigate } from "react-router-dom";

function UnderstandDeleteAccount() {
  const { user, isLoading } = useSelector((state) => state.session);
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const nav = useNavigate();

  if (isLoading) return null;

  const handleDelete = () => {
    dispatch(thunkDeleteUser(user.id));
    setModalContent(<AlertChange message="We'll be here if you need us again." />);
    nav("/");
  };

  return (
    <div id="confirm-delete-account-modal">
      <h1>Are you absolutely sure?</h1>
      <h3>Understand the following:</h3>
      <ul>
        <li>Your account ({user.email}) will be unrecoverable.</li>
        <li>Your ({user.videoCount}) videos will no longer be saved.</li>
        <li>Your account settings will be removed.</li>
        <li>Your personal information will be removed.</li>
      </ul>
      <h3>This is your last chance to keep your account.</h3>
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

export default UnderstandDeleteAccount;
