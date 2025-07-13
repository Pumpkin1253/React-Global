import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./DeleteForm.module.scss";

export interface DeleteFormProps {
  onDeleteMovie: (movie: Movie) => void;
  movie: Movie;
}

export function DeleteForm(props: DeleteFormProps) {
  return (
    <div className={styles.deleteForm}>
      <h2>Delete Movie</h2>
      <p>Are you sure you want to delete this movie?</p>
      <button onClick={() => props.onDeleteMovie(props.movie)}>Confirm</button>
    </div>
  );
}
