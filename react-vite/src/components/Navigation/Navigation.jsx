import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoading = useSelector((state) => state.session.isLoading);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    nav(sessionUser ? "/profile" : "/login");
  };

  return (
    <div className="navigation">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!sessionUser && <h1 onClick={() => nav("/")}>Welcome to MyTube</h1>}
          {sessionUser && (
            <div>
              <button onClick={() => nav("/my-videos")}>My Videos</button>
              <button onClick={() => nav("/add-video")}>Add Video</button>
              <button onClick={() => dispatch(thunkLogout())}>Logout</button>
            </div>
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
