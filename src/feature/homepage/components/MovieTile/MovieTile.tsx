import { FiMoreVertical } from "react-icons/fi";
import type { Movie } from "../../interfaces/homepage.interfaces";
import styles from "./MovieTile.module.scss";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export interface MovieTileProps {
  movie: Movie;
  onMovieDetails: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
  onEditMovie: (movie: Movie) => void;
}

export function MovieTile(props: MovieTileProps) {
  const [tileMenuStatus, setTileMenuStatus] = useState<boolean>(false);

  const changeTileMenuStatus = (e: React.MouseEvent, status: boolean) => {
    e.stopPropagation();
    setTileMenuStatus(status);
  };

  const showDeleteForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onDeleteMovie(props.movie);
  };

  const showEditForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onEditMovie(props.movie);
  };

  return (
    <div className={styles.tile}>
      <div className={styles.tileImage}>
        <img
          src={props.movie.image}
          className={styles.tileImg}
          onClick={() => props.onMovieDetails(props.movie)}
        />
        <FiMoreVertical
          className={styles.tileKebab}
          onClick={(event) => changeTileMenuStatus(event, true)}
        />

        {tileMenuStatus && (
          <div className={styles.tileMenu}>
            <MdClose
              className={styles.tileMenuClose}
              onClick={(event) => changeTileMenuStatus(event, false)}
            />
            <div
              className={styles.tileMenuItem}
              onClick={(event) => showEditForm(event)}
            >
              Edit
            </div>
            <div
              className={styles.tileMenuItem}
              onClick={(event) => showDeleteForm(event)}
            >
              Delete
            </div>
          </div>
        )}
      </div>
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
