import { useModal } from "../../context/Modal";
import { useTranslation } from "../../context/Lang";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideoThunk } from "../../redux/videoDetails";
import { thunkDeleteUser } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import { exportNotes } from "../../utils";
import AlertChange from "../AlertChange";
import "./UnderstandDelete.css";

function UnderstandDelete({ type, element }) {
  const { closeModal, setModalContent } = useModal();
  const { user } = useSelector((state) => state.session);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleExportNotes = async (e) => {
    e.preventDefault();
    try {
      await exportNotes(user.id);
    } catch (err) {
      console.error(err);
    }
  };

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
        <>
          <ul>
            <li>{t("understand_delete_account_1", element.email)}</li>
            <li>{t("understand_delete_account_2", element.videoCount)}</li>
            <li>{t("understand_delete_account_3")}</li>
            <li>{t("understand_delete_account_4")}</li>
            <li>{t("understand_delete_account_5")}</li>
            <li>{t("understand_delete_account_6")}</li>
          </ul>
          <h3>{t("understand_export_notes")}</h3>
          <button id="export" onClick={handleExportNotes}>
            {t("export_notes")}
          </button>
        </>
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
