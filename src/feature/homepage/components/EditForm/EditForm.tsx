import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import type { Genre, Movie } from "../../interfaces/homepage.interfaces";
import styles from "./EditForm.module.scss";
import { useState } from "react";
import { genreList } from "../../constants/homepage.constants";
import images from "../../../../assets";

export interface EditFormProps {
  formTitle: string;
  movie?: Movie;
  lastMovieId?: string;
  onEditMovie: (movie: Movie) => void;
}

export function EditForm(props: EditFormProps) {
  const [title, setTitle] = useState(props.movie ? props.movie.name : "");
  const [releasedYear, setReleasedYear] = useState<string>(
    props.movie ? props.movie.releasedYear : ""
  );
  const [url, setUrl] = useState<string>(props.movie ? props.movie.url : "");
  const [rating, setRating] = useState<string>(
    props.movie ? props.movie.details.rating : ""
  );
  const [genres, setGenre] = useState<Genre[]>(
    props.movie ? props.movie.genres : []
  );
  const [duration, setDuration] = useState<string>(
    props.movie ? props.movie.details.duration : ""
  );
  const [description, setDescription] = useState<string>(
    props.movie ? props.movie.details.description : ""
  );

  const handleGenres = (genreId: string) => {
    const genre = genreList.find((genre) => genre.id === genreId);
    if (genre) {
      setGenre([genre]);
    }
  };

  const handleSubmit = () => {
    if (props.movie) {
      props.onEditMovie({
        ...props.movie,
        name: title,
        releasedYear: releasedYear,
        genres: genres,
        url: url,
        details: {
          rating: rating,
          duration: duration,
          description: description,
        },
      });
    } else {
      props.onEditMovie({
        id: props.lastMovieId!,
        image: images.new,
        name: title,
        releasedYear: releasedYear,
        genres: genres,
        url: url,
        details: {
          rating: rating,
          duration: duration,
          description: description,
        },
      });
    }
  };

  const handleReset = () => {
    setTitle(props.movie ? props.movie.name : "");
    setReleasedYear(props.movie ? props.movie.releasedYear : "");
    setUrl(props.movie ? props.movie.url : "");
    setRating(props.movie ? props.movie.details.rating : "");
    setGenre(props.movie ? props.movie.genres : []);
    setDuration(props.movie ? props.movie.details.duration : "");
    setDescription(props.movie ? props.movie.details.description : "");
  };

  return (
    <form
      className={styles.EditForm}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <h2>{props.formTitle}</h2>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>TITLE</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.field}>
          <label>RELEASE DATE</label>
          <div className={styles.iconInput}>
            <input
              name="releaseDate"
              value={releasedYear}
              onChange={(e) => setReleasedYear(e.target.value)}
              type="text"
            />
            <FaCalendarAlt />
          </div>
        </div>

        <div className={styles.field}>
          <label>MOVIE URL</label>
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.field}>
          <label>RATING</label>
          <input
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            type="text"
          />
        </div>

        <div className={styles.field}>
          <label>GENRE</label>
          <div className={styles.iconInput}>
            <select
              name="genre"
              value={genres.map((genre) => genre.id)[0]}
              onChange={(e) => handleGenres(e.target.value)}
            >
              <option value="">{`Select Genre`}</option>
              {genreList.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <FaChevronDown />
          </div>
        </div>
        <div className={styles.field}>
          <label>RUNTIME</label>
          <input
            name="runtime"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="text"
          />
        </div>
      </div>

      <div className={styles.fieldFull}>
        <label>OVERVIEW</label>
        <textarea
          name="overview"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
      </div>

      <footer className={styles.footer}>
        <button type="reset" className={styles.resetBtn}>
          RESET
        </button>
        <button type="submit" className={styles.submitBtn}>
          SUBMIT
        </button>
      </footer>
    </form>
  );
}
