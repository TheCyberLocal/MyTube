import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const {
    user: sessionUser,
    isLoading: sessionLoading,
  } = useSelector((state) => state.session);

  const nav = useNavigate();

  if (sessionLoading) return null;

  const handleProfileClick = () => {
    nav(sessionUser ? "/profile" : "/login");
  };

  return (
    <div id="navigation">
      {sessionUser ? (
        <div>
          <button onClick={() => nav("/my-videos")}>My Videos</button>
          <button onClick={() => alert("add video modal here")}>
            Add Video
          </button>
        </div>
      ) : (
        <h1 onClick={() => nav("/")}>Welcome to MyTube</h1>
      )}
      <div>
        <button onClick={() => nav("/help")}>Help</button>
        <button onClick={handleProfileClick}>Profile</button>
      </div>
    </div>
  );
}

export default Navigation;
