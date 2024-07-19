import { useModal } from "../../context/Modal";
import { getTranslation as t } from "../../utils";
import { useSelector } from "react-redux";

function AlertChange({ message }) {
  const { closeModal } = useModal();
  const { language: lang } = useSelector((state) => state.session);

  return (
    <div id="prompt-modal">
      <h1>{t(lang, "you_are_all_set")}</h1>
      <h3>{t(lang, message)}</h3>
      <div className="row">
        <button onClick={closeModal} id="ok">
          {t(lang, "thanks")}
        </button>
      </div>
    </div>
  );
}

export default AlertChange;
