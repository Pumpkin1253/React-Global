import "./GenreList.scss";
import type { Genre } from "../../interfaces/homepage.interfaces";

export interface GenreListProps {
  genres: Genre[];
  selectedGenre: Genre;
  onSelectGenre: (genre: Genre) => void;
}

export function GenreList(props: GenreListProps) {
  return (
    <div className="genre-list">
      {props.genres.map((genre) => (
        <div
          className={`genre-list__item ${
            props.selectedGenre.id === genre.id
              ? "genre-list__item--selected"
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
