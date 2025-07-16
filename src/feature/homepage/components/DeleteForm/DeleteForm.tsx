import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./DeleteForm.module.scss";

export interface DeleteFormProps {
  movie: Movie;
  movieList: Movie[];
  onDeleteMovie: (movie: Movie[]) => void;
}

export function DeleteForm(props: DeleteFormProps) {
  const onSubmit = () => {
    props.onDeleteMovie(
      props.movieList.filter((movie) => movie.id !== props.movie.id)
    );
  };

  return (
    <div className={styles.deleteForm}>
      <h2>Delete Movie</h2>
      <p>Are you sure you want to delete this movie?</p>
      <button onClick={() => onSubmit()}>Confirm</button>
    </div>
  );
}
