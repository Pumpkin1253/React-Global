import { FaSearch } from "react-icons/fa";
import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./MovieDetails.module.scss";
import { formatRuntime } from "../../../../core/common/functions";

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

      <img src={props.movie.poster_path} className={styles.movieDetailsImg} />

      <div className={styles.movieDetailsInfo}>
        <div className={styles.movieDetailsTitle}>
          <div className={styles.movieDetailsName}>{props.movie.title}</div>
          <div className={styles.movieDetailsRating}>
            {props.movie.vote_average}
          </div>
        </div>

        <div className={styles.movieDetailsGenre}>
          {props.movie.genres.map((genre) => genre).join(", ")}
        </div>
        <div className={styles.movieDetailsMeta}>
          <span>{props.movie.release_date}</span>
          <span>{formatRuntime(props.movie.runtime)}</span>
        </div>
        <div className={styles.movieDetailsDescription}>
          {props.movie.overview}
        </div>
      </div>
    </div>
  );
}
