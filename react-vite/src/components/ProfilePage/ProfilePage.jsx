import { useState, useEffect } from "react";
import { thunkLogout, thunkUpdateUser } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getTranslation } from "../../utils";
import ConfirmDelete from "../ConfirmDelete";
import ChangePasswordModal from "../ChangePasswordModal";

const languageOptions = [
  { value: "en", label: "English" }, // 1.132 billion speakers
  { value: "zh", label: "中文" }, // 1.117 billion speakers
  { value: "hi", label: "हिन्दी" }, // 615 million speakers
  { value: "es", label: "Español" }, // 534 million speakers
  { value: "fr", label: "Français" }, // 280 million speakers
  { value: "ar", label: "العربية" }, // 274 million speakers
  { value: "bn", label: "বাংলা" }, // 265 million speakers
  { value: "ru", label: "Русский" }, // 258 million speakers
  { value: "pt", label: "Português" }, // 234 million speakers
  { value: "id", label: "Bahasa Indonesia" }, // 199 million speakers
  { value: "ur", label: "اردو" }, // 232 million speakers
  { value: "de", label: "Deutsch" }, // 132 million speakers
  { value: "ja", label: "日本語" }, // 125 million speakers
  { value: "ms", label: "Bahasa Melayu" }, // 77 million speakers
  { value: "vi", label: "Tiếng Việt" }, // 76 million speakers
  { value: "ko", label: "한국어" }, // 77 million speakers
  { value: "it", label: "Italiano" }, // 67 million speakers
  { value: "pl", label: "Polski" }, // 50 million speakers
  { value: "tr", label: "Türkçe" }, // 75 million speakers
  { value: "th", label: "ไทย" }, // 60 million speakers
];

function ProfilePage() {
  const { user, isLoading } = useSelector((state) => state.session);

  const [t, setT] = useState(() => () => "");

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { setModalContent } = useModal();
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [language, setLanguage] = useState(user?.language);
  const [theme, setTheme] = useState(user?.theme);
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);
  const [options, setOptions] = useState(languageOptions || []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkUpdateUser(user.id, {
        username,
        name,
        email,
        language,
        theme,
      })
    );
    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      setUpdated(true);
    }
  };

  useEffect(() => {
    getTranslation(user?.language).then((func) => setT(() => func));
  }, [user?.language]);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    nav("/login");
  };

  const handleUndo = async (e) => {
    e.preventDefault();

    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
  };

  if (isLoading) return null;

  if (!isLoading && !user) return <Navigate to="/" replace={true} />;

  return (
    <div id="main-container">
      <h1>{t("profile")}</h1>
      <h3>{t("you_have_organized_videos", user.videoCount)}</h3>
      <form>
        <div className="select-container">
          <div>
            <label>{t("language")}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languageOptions.map((e) => (
                <option value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>{t("theme")}</label>
            <select>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="error-container">
          {errors.name && <p className="error">{t("invalid_name")}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("name")}</label>
        </div>
        <div className="error-container">
          {errors.name && <p className="error">{t("invalid_name")}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("username")}</label>
        </div>
        <div className="error-container">
          {errors.username && (
            <p className="error">
              {t(
                username.length <= 20 && username.length >= 4
                  ? "username_exists"
                  : "invalid_username"
              )}
            </p>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("email")}</label>
        </div>
        <div className="error-container">
          {errors.email && (
            <p className="error">
              {t(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "email_exists"
                  : "invalid_email"
              )}
            </p>
          )}
          {updated && <p className="updated">{t("changes_saved")}</p>}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            {t("save")}
          </button>
          <label className="button-label">{t("or")}</label>
          <button style={{ flex: 1 }} onClick={handleUndo}>
            {t("cancel")}
          </button>
        </div>
      </form>
      <div className="under-form">
        <div className="button-container">
          <button onClick={handleLogout} className="demo-user">
            {t("log_out")}
          </button>
        </div>
        <div className="button-container">
          <button
            className="danger"
            onClick={() =>
              setModalContent(<ConfirmDelete type="account" element={user} />)
            }
          >
            {t("delete_account")}
          </button>
          <button
            className="danger"
            onClick={() => setModalContent(<ChangePasswordModal />)}
          >
            {t("change_password")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
