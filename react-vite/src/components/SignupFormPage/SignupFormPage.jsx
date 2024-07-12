import { useState } from "react";
import { thunkSignup } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        name,
        email,
        password,
        confirm_password: confirmPassword
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

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Username</label>
        </div>
        <div className="error-container">
          {errors.username && <p className="error">{errors.username[0]}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Name</label>
        </div>
        <div className="error-container">
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Email</label>
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
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Confirm Password</label>
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="error-container">
          {errors.confirm_password && <p className="error">{errors.confirm_password[0]}</p>}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }}>Sign Up</button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={() => nav("/login")}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
