import { useModal } from "../../context/Modal";

function AlertPasswordChange() {
  const { closeModal } = useModal();

  return (
    <div id="prompt-modal">
      <h1>You're all set!</h1>
      <div className="row">
        <button onClick={closeModal} id="ok">
          Thanks
        </button>
      </div>
    </div>
  );
}

export default AlertPasswordChange;
