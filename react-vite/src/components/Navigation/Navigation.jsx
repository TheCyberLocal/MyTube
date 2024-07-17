import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import VideoModal from "../VideoModal";
import "./Navigation.css";

function Navigation() {
  const { user, isLoading } = useSelector((state) => state.session);
  const nav = useNavigate();
  const { setModalContent } = useModal();

  const handleProfileClick = () => {
    nav(user ? "/profile" : "/login");
  };

  const handleAddVideoClick = () => {
    setModalContent(<VideoModal />);
  };

  if (isLoading) return null;

  return (
    <div id="navigation">
      {user ? (
        <div>
          <button onClick={() => nav("/my-videos")}>My Videos</button>
          <button onClick={handleAddVideoClick}>Add Video</button>
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
