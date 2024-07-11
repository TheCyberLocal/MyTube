import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation">
      {sessionUser && <h1>Welcome to MyTube</h1>}
      {!sessionUser && (
        <>
          <div>
            <button>My Videos</button>
            <button>Add Video</button>
          </div>
          <div>
            <button>Help</button>
            <button>Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
