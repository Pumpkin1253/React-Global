import { useOutletContext, useParams } from "react-router-dom";
import { Modal } from "../Modal";
import styles from "./DeleteForm.module.scss";
import { deleteMovie } from "../../api/movie";

interface DeleteFormContextType {
  onCloseModal: () => void;
  onSubmitModal: () => void;
}

export function DeleteForm() {
  const { onCloseModal, onSubmitModal } =
    useOutletContext<DeleteFormContextType>();
  const params = useParams();

  const onSubmit = () => {
    if (params.movieId)
      deleteMovie(params.movieId).finally(() => onSubmitModal());
  };

  return (
    <Modal
      modalContent={
        <div className={styles.deleteForm}>
          <h2>Delete Movie</h2>
          <p>Are you sure you want to delete this movie?</p>
          <button onClick={() => onSubmit()}>Confirm</button>
        </div>
      }
      onClose={onCloseModal}
    ></Modal>
  );
}
