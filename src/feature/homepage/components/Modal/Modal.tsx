import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

export interface ModalProps {
  onClose: () => void;
  modalContent: React.ReactNode;
}

export function Modal(prop: ModalProps) {
  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop} onClick={prop.onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {prop.modalContent}
      </div>
    </div>,
    document.body
  );
}
