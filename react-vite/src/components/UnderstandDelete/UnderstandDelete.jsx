import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideoThunk } from "../../redux/videoDetails";
import { useNavigate } from "react-router-dom";
import AlertChange from "../AlertChange";
import { getTranslation } from "../../utils";
import "./UnderstandDelete.css";

function UnderstandDelete({ type, element }) {
  const { closeModal, setModalContent } = useModal();
  const lang = useSelector((state) => state.session.language);
  const t = getTranslation(lang);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleDelete = () => {
    if (type === "video") {
      dispatch(deleteVideoThunk(element.id));
      setModalContent(<AlertChange message="alert_video_deleted" />);
      nav("/my-videos");
    } else if (type === "account") {
      dispatch(thunkDeleteUser(user.id));
      setModalContent(<AlertChange message="alert_goodbye" />);
      nav("/");
    }
  };

  const getUnderstanding = () => {
    if (type === "video") {
      return (
        <ul>
          <li>{t("understand_delete_video_1", element.title)}</li>
          <li>{t("understand_delete_video_2")}</li>
          <li>{t("understand_delete_video_3")}</li>
        </ul>
      );
    } else if (type === "account") {
      return (
        <ul>
          <li>{t("understand_delete_account_1", element.email)}</li>
          <li>{t("understand_delete_account_2", element.videoCount)}</li>
          <li>{t("understand_delete_account_3")}</li>
          <li>{t("understand_delete_account_4")}</li>
          <li>{t("understand_delete_account_5")}</li>
          <li>{t("understand_delete_account_6")}</li>
        </ul>
      );
    }
  };

  return (
    <div id="understand-delete">
      <h1>{t("are_you_absolutely_sure")}</h1>
      <h3>{t("understand_the_following")}</h3>
      {getUnderstanding()}
      <h3>{t("last_chance", type)}</h3>
      <div className="row">
        <button onClick={handleDelete} id="yes">
          {t("delete")}
        </button>
        <button onClick={closeModal} id="no">
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}

export default UnderstandDelete;
