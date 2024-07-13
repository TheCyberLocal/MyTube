import { useState } from "react";
import { thunkSignup } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import "./ProfilePage.css";

function ProfilePage() {
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

  const nav = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);

  if (!sessionLoading && !sessionUser)
    return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch();
    // my thunk for patch user

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      setUpdated(true);
    }
  };

  return (
    <div id="main-container">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
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

export default ProfilePage;
