import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const { user, isLoading } = useSelector((state) => state.session);

  const nav = useNavigate();

  if (isLoading) return null;

  const handleProfileClick = () => {
    nav(user ? "/profile" : "/login");
  };

  return (
    <div id="navigation">
      {user ? (
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
