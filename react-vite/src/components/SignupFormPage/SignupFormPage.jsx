import { useState, useEffect } from "react";
import { thunkSignup } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getTranslation } from "../../utils";

function SignupFormPage() {
  const { user, isLoading } = useSelector((state) => state.session);

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    getTranslation(user?.language).then((func) => setT(() => func));
  }, [user?.language]);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        name,
        email,
        password,
        confirm_password: confirmPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      nav("/my-videos");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isLoading && user) return <Navigate to="/my-videos" replace={true} />;

  if (isLoading) return null;

  return (
    <div id="main-container">
      <h1>{t("sign_up")}</h1>
      <form>
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
          {errors.name && <p className="error">{errors.name[0]}</p>}
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
          {errors.username && <p className="error">{errors.username[0]}</p>}
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
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("password")}</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {t(showPassword ? "hide" : "show")}
          </button>
        </div>
        <div className="error-container">
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("confirm_password")}</label>
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
            <p className="error">{errors.confirm_password[0]}</p>
          )}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            {t("sign_up")}
          </button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={() => nav("/login")}>
            {t("log_in")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
