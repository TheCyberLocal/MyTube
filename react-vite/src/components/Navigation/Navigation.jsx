import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import VideoModal from "../VideoModal";
import { getTranslation } from "../../utils";
import "./Navigation.css";

function Navigation() {
  const { user, isLoading } = useSelector((state) => state.session);
  const { setModalContent } = useModal();
  const nav = useNavigate();
  const t = getTranslation(user?.language);

  const handleProfileClick = () => {
    nav(user ? "/profile" : "/login");
  };

  const handleAddVideoClick = () => {
    setModalContent(<VideoModal type="add" />);
  };

  if (isLoading) return null;

  return (
    <div id="navigation">
      {user ? (
        <div>
          <button onClick={() => nav("/my-videos")}>{t("my_videos")}</button>
          <button onClick={handleAddVideoClick}>{t("add_video")}</button>
        </div>
      ) : (
        <h1 onClick={() => nav("/")}>Welcome to MyTube</h1>
      )}
      <div>
        <button onClick={() => nav("/help")}>{t("help")}</button>
        <button onClick={handleProfileClick}>{t("profile")}</button>
      </div>
    </div>
  );
}

export default Navigation;
