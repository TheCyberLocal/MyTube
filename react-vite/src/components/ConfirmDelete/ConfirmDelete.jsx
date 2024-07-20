import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getTranslation } from "../../utils";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UnderstandDelete from "../UnderstandDelete";
import {
  deleteNoteThunk,
  deleteHighlightThunk,
} from "../../redux/videoDetails";
import "./ConfirmDelete.css";

function ConfirmDelete({ type, element = null }) {
  const { closeModal } = useModal();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    getTranslation(user?.language).then((func) => setT(() => func));
  }, [user?.language]);

  const handleDelete = () => {
    if (type === "account") {
      setModalContent(<UnderstandDelete type="account" element={element} />);
    } else if (type === "note") {
      dispatch(deleteNoteThunk(element.id));
      closeModal();
    } else if (type === "video") {
      setModalContent(<UnderstandDelete type="video" element={element} />);
    } else if (type === "highlight") {
      dispatch(deleteHighlightThunk(element.id));
      closeModal();
    }
  };

  const getName = () => {
    if (type === "account") return element.username;
    return element.title;
  };

  return (
    <div id="prompt-modal">
      <h1>{t("confirm_delete_of")}</h1>
      <h3>
        {t(type)} - {getName()}
      </h3>
      <h3>{t("are_you_sure")}</h3>
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

export default ConfirmDelete;
