import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./MovieTile.module.scss";

export interface MovieTileProps {
  movie: Movie;
  onClickMovie: (movie: Movie) => void;
}

export function MovieTile(props: MovieTileProps) {
  return (
    <div
      className={styles.tile}
      onClick={() => props.onClickMovie(props.movie)}
    >
      <img src={props.movie.image} className={styles.tileImg} />
      <div className={styles.tileDetails}>
        <div>
          <div className={styles.tileName}>{props.movie.name}</div>
          <span className={styles.tileGenre}>
            {props.movie.genres.map((genre) => genre.name).join(", ")}
          </span>
        </div>
        <div>
          <div className={styles.tileDate}>{props.movie.releasedYear}</div>
        </div>
      </div>
    </div>
  );
}
