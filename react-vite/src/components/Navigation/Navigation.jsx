import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoading = useSelector((state) => state.session.isLoading);
  const nav = useNavigate();

  const handleProfileClick = () => {
    nav(sessionUser ? "/profile" : "/login");
  };

  return (
    <div className="navigation">
      {!isLoading && (
        <>
          {sessionUser ? (
            <div>
              <button onClick={() => nav("/my-videos")}>My Videos</button>
              <button onClick={() => nav("/add-video")}>Add Video</button>
            </div>
          ) : (
            <h1 onClick={() => nav("/")}>Welcome to MyTube</h1>
          )}
          <div>
            <button onClick={() => nav("/help")}>Help</button>
            <button onClick={handleProfileClick}>Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
