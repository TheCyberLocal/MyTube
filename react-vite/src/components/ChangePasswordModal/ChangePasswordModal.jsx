import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { thunkUpdatePassword } from "../../redux/session";
import { useTranslation } from "../../context/Lang";
import AlertChange from "../AlertChange";

function ChangePasswordModal() {
  const { user, isLoading } = useSelector((state) => state.session);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { setModalContent } = useModal();

  if (isLoading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkUpdatePassword(user.id, {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      setModalContent(<AlertChange message="alert_password_reset" />);
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
      <h1>{t("change_password")}</h1>
      <form>
        <div className="input-container">
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("current_password")}</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowOldPassword}
          >
            {t(showOldPassword ? "hide" : "show")}
          </button>
        </div>
        <div className="error-container">
          {errors.old_password && (
            <p className="error">{t("invalid_current_password")}</p>
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
          <label className="moving-label">{t("new_password")}</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {t(showPassword ? "hide" : "show")}
          </button>
        </div>
        <div className="error-container">
          {errors.new_password && (
            <p className="error">{t("invalid_new_password")}</p>
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
          <label className="moving-label">{t("confirm_new_password")}</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {t(showPassword ? "hide" : "show")}
          </button>
        </div>
        <div className="error-container">
          {errors.confirm_password && (
            <p className="error">{t("invalid_confirm_password")}</p>
          )}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            {t("save")}
          </button>
          <label className="button-label">{t("or")}</label>
          <button style={{ flex: 1 }} onClick={closeModal}>
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordModal;
