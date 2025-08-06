import { FaSearch } from "react-icons/fa";
import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./MovieDetails.module.scss";

export interface MovieDetailsProps {
  movie: Movie;
  onShowSearchForm: () => void;
}

export function MovieDetails(props: MovieDetailsProps) {
  return (
    <div className={styles.movieDetails}>
      <button
        data-cy="movie-search"
        className={styles.movieDetailsSearch}
        onClick={props.onShowSearchForm}
      >
        <FaSearch />
      </button>

      <img src={props.movie.image} className={styles.movieDetailsImg} />

      <div className={styles.movieDetailsInfo}>
        <div className={styles.movieDetailsTitle}>
          <div className={styles.movieDetailsName}>{props.movie.name}</div>
          <div className={styles.movieDetailsRating}>
            {props.movie.details.rating}
          </div>
        </div>

        <div className={styles.movieDetailsGenre}>
          {props.movie.genres.map((genre) => genre).join(", ")}
        </div>
        <div className={styles.movieDetailsMeta}>
          <span>{props.movie.releasedYear}</span>
          <span>{props.movie.details.duration}</span>
        </div>
        <div className={styles.movieDetailsDescription}>
          {props.movie.details.description}
        </div>
      </div>
    </div>
  );
}
