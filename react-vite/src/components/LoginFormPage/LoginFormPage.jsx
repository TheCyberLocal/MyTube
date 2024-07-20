import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getTranslation } from "../../utils";

function LoginFormPage() {
  const { user, isLoading } = useSelector((state) => state.session);

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    getTranslation(user?.language).then((func) => setT(() => func));
  }, [user?.language]);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    }
  };

  const demoLogin = () => {
    dispatch(
      thunkLogin({
        credential: "Demo123",
        password: "Demo123!",
      })
    );
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isLoading && user) return <Navigate to="/my-videos" replace={true} />;

  if (isLoading) return null;

  return (
    <div id="main-container">
      <h1>{t("log_in")}</h1>
      <form>
        <div className="input-container">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("credential")}</label>
        </div>
        <div className="error-container">
          {errors.credential && <p className="error">{errors.credential[0]}</p>}
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
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            {t("log_in")}
          </button>
          <label className="button-label">{t("or")}</label>
          <button style={{ flex: 1 }} onClick={() => nav("/signup")}>
            {t("sign_up")}
          </button>
        </div>
      </form>
      <div className="under-form">
        <div className="button-container">
          <button onClick={demoLogin} className="demo-user">
            {t("log_in_as_demo")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
