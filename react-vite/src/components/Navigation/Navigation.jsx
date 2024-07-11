import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const nav = useNavigate();

  return (
    <div className="navigation">
      {sessionUser && <h1>Welcome to MyTube</h1>}
      {!sessionUser && (
        <>
          <div>
            <button onClick={() => nav("/my-videos")}>My Videos</button>
            <button onClick={() => console.log("opens pop up modal to add video")}>Add Video</button>
          </div>
          <div>
            <button onClick={() => nav("/help")}>Help</button>
            <button onClick={() => nav("/profile")}>Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
