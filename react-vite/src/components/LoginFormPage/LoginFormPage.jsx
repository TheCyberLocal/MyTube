import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function LoginFormPage() {
  const { user, isLoading } = useSelector((state) => state.session);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoading && user) return <Navigate to="/my-videos" replace={true} />;

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
        credential: "Demo",
        password: "Demo123!",
      })
    );
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div id="main-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Email/Username</label>
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
          <label className="moving-label">Password</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="error-container">
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }}>Log In</button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={() => nav("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
      <div className="under-form">
        <div className="button-container">
          <button onClick={demoLogin} className="demo-user">
            Log in as Demo User
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
