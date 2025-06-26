import styles from "./GenreList.module.scss";
import type { Genre } from "../../interfaces/homepage.interfaces";

export interface GenreListProps {
  genres: Genre[];
  selectedGenre: Genre;
  onSelectGenre: (genre: Genre) => void;
}

export function GenreList(props: GenreListProps) {
  return (
    <div className={styles.genreList}>
      {props.genres.map((genre) => (
        <div
          className={`${styles.genreListItem} ${
            props.selectedGenre.id === genre.id
              ? styles.genreListItemSelected
              : ""
          }`}
          key={genre.id}
          onClick={() => props.onSelectGenre(genre)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
}
