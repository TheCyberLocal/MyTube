import { useModal } from "../../context/Modal";
import { useTranslation } from "../../context/Lang";

function AlertChange({ message }) {
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <div id="prompt-modal">
      <h1>{t("you_are_all_set")}</h1>
      <h3>{t(message)}</h3>
      <div className="row">
        <button onClick={closeModal} id="ok">
          {t("thanks")}
        </button>
      </div>
    </div>
  );
}

export default AlertChange;
