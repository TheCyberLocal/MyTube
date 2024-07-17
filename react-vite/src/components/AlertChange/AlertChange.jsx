import { useModal } from "../../context/Modal";

function AlertChange({ message }) {
  const { closeModal } = useModal();

  return (
    <div id="prompt-modal">
      <h1>You&apos;re all set!</h1>
      <h3>{message}</h3>
      <div className="row">
        <button onClick={closeModal} id="ok">
          Thanks
        </button>
      </div>
    </div>
  );
}

export default AlertChange;
