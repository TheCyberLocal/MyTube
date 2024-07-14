import { useModal } from "../../context/Modal";

function AlertAccountDeletion() {
  const { closeModal } = useModal();

  return (
    <div id="prompt-modal">
      <h1>You're all set!</h1>
      <h3>We'll be here if you need us again.</h3>
      <div className="row">
        <button onClick={closeModal} id="ok">
          Thanks
        </button>
      </div>
    </div>
  );
}

export default AlertAccountDeletion;
