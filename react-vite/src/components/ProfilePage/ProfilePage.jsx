import { useState } from "react";
import { thunkLogout, thunkUpdateUser } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import ConfirmDelete from "../ConfirmDelete";
import ChangePasswordModal from "../ChangePasswordModal";

function ProfilePage() {
  const { user, isLoading } = useSelector((state) => state.session);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { setModalContent } = useModal();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkUpdateUser(user.id, {
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

    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
  };

  if (isLoading) return null;

  if (!isLoading && !user) return <Navigate to="/" replace={true} />;

  return (
    <div id="main-container">
      <h1>Profile</h1>
      <h3>You have organized {user.videoCount} videos!</h3>
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
            Save
          </button>
          <label className="button-label">or</label>
          <button style={{ flex: 1 }} onClick={handleUndo}>
            Cancel
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
              setModalContent(<ConfirmDelete type="Account" element={user} />)
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
