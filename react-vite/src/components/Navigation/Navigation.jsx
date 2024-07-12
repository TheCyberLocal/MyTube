import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    nav(sessionUser ? "/profile" : "/login");
  };

  return (
    <div className="navigation">
      {!sessionUser && <h1 onClick={() => nav("/")}>Welcome to MyTube</h1>}
      {sessionUser && (
        <div>
          <button onClick={() => nav("/my-videos")}>My Videos</button>
          <button onClick={() => console.log("opens add video modal")}>
            Add Video
          </button>
        </div>
      )}
      <div>
        <button onClick={() => nav("/help")}>Help</button>
        <button onClick={handleProfileClick}>Profile</button>
      </div>
    </div>
  );
}

export default Navigation;
