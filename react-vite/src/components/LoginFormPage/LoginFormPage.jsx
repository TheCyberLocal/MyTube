import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
    } else {
      nav("/my-videos");
    }
  };

  const demoLogin = () => {
    dispatch(
      thunkLogin({
        credential: "Demo",
        password: "password",
      })
    );
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder=" "
          />
          <label className="moving-label">Email/Username</label>
        </div>
        <div className="error-container">
          {errors.credential && <p className="error">{errors.credential}</p>}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
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
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }}>Login</button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={() => nav("/signup")}>
            Sign Up
          </button>
        </div>
        <div className="button-container">
          <button onClick={demoLogin} className="demo-user">
            Login as Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
