import { useEffect, useState } from "react";
import {
  thunkLogout,
  thunkAuthenticate,
  thunkUpdateUser,
} from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import ChangePasswordModal from "../ChangePasswordModal";

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

  if (!sessionLoading && !sessionUser)
    return <Navigate to="/" replace={true} />;

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { setModalContent } = useModal();
  const [videoCount, setVideoCount] = useState(sessionUser.videoCount);
  const [name, setName] = useState(sessionUser.name);
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkUpdateUser(sessionUser.id, {
        username,
        name,
        email,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      setUpdated(true);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    nav("/login");
  };

  const handleUndo = async (e) => {
    e.preventDefault();

    setName(sessionUser.name);
    setUsername(sessionUser.username);
    setEmail(sessionUser.email);
  };

  return (
    <div id="main-container">
      <h1>Profile</h1>
      <h3>You have organized {videoCount} videos!</h3>
      <form>
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
          {updated && <p className="updated">Changes saved successfully</p>}
        </div>
        <div className="button-container">
          <button style={{ flex: 2 }} onClick={handleSubmit}>
            Keep Changes
          </button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={handleUndo}>
            Undo
          </button>
        </div>
      </form>
      <div className="under-form">
        <div className="button-container">
          <button onClick={handleLogout} className="demo-user">
            Log Out
          </button>
        </div>
        <div className="button-container">
          <button
            className="danger"
            onClick={() =>
              setModalContent(
                <ConfirmDeleteModal
                  type="Account"
                  title={`${sessionUser.username}`}
                />,
              )
            }
          >
            Delete Account
          </button>
          <button
            className="danger"
            onClick={() => setModalContent(<ChangePasswordModal />)}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;