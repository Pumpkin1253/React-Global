import styles from "./GenreList.module.scss";

export interface GenreListProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export function GenreList(props: GenreListProps) {
  return (
    <div className={styles.genreList}>
      {props.genres.map((genre) => (
        <div
          className={`${styles.genreListItem} ${
            props.selectedGenre === genre ? styles.genreListItemSelected : ""
          }`}
          key={genre}
          onClick={() => props.onSelectGenre(genre)}
        >
          {genre}
        </div>
      ))}
    </div>
  );
}
