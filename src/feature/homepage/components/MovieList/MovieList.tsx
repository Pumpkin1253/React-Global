import type { Movie } from "../../interfaces/homepage.interfaces";
import { MovieTile } from "../MovieTile";
import styles from "./MovieList.module.scss";

export interface MovieListProps {
  movieList: Movie[];
  onMovieDetails: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
  onEditMovie: (movie: Movie) => void;
}

export function MovieList(props: MovieListProps) {
  return (
    <>
      <div className={styles.listHeader}>
        <span className={styles.listHeaderCount}>{props.movieList.length}</span>{" "}
        movies found
      </div>
      <div className={styles.list}>
        {props.movieList.map((movie) => (
          <MovieTile
            movie={movie}
            key={movie.name}
            onMovieDetails={props.onMovieDetails}
            onDeleteMovie={props.onDeleteMovie}
            onEditMovie={props.onEditMovie}
          ></MovieTile>
        ))}
      </div>
    </>
  );
}
