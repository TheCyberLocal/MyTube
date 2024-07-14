import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { thunkUpdatePassword } from "../../redux/session";
import AlertPasswordChange from "../AlertPasswordChange/AlertPasswordChange";

function ChangePasswordModal() {
  const {
    user: sessionUser,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSelector((state) => state.session);
  const {
    searchResults: myVideos,
    isLoading: myVideosLoading,
    error: myVideosError,
  } = useSelector((state) => state.myVideos);
  const {
    video,
    notes,
    highlights,
    isLoading: videoDetailsLoading,
    error: videoDetailsError,
  } = useSelector((state) => state.videoDetails);

  if (sessionLoading) return null;

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkUpdatePassword(sessionUser.id, {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      setModalContent(<AlertPasswordChange />);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  return (
    <div id="main-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Current Password</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowOldPassword}
          >
            {showOldPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="error-container">
          {errors.old_password && (
            <p className="error">{errors.old_password[0]}</p>
          )}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">New Password</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="error-container">
          {errors.new_password && (
            <p className="error">{errors.new_password[0]}</p>
          )}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Confirm New Password</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="error-container">
          {errors.confirm_password && (
            <p className="error">{errors.confirm_password[0]}</p>
          )}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            Keep Changes
          </button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={closeModal}>
            Undo
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePasswordModal;
