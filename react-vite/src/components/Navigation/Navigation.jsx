import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navigation">
      {!sessionUser && <h1>Welcome to MyTube</h1>}
      {sessionUser && (
        <>
          <div>
            <button onClick={() => nav("/my-videos")}>My Videos</button>
            <button onClick={() => console.log("opens pop up modal to add video")}>Add Video</button>
          </div>
          <div>
            <button onClick={() => nav("/help")}>Help</button>
            <button onClick={() => dispatch(thunkLogout())}>Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
