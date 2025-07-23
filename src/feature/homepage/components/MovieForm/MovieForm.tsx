import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import type { FormValues, Movie } from "../../interfaces/homepage.interfaces";
import styles from "./MovieForm.module.scss";
import { genreList } from "../../constants/homepage.constants";
import { useForm } from "react-hook-form";

export interface MovieFormProps {
  formTitle: string;
  movie?: Movie;
  lastMovieId?: string;
  onSubmit: (data: FormValues) => void;
}

export function MovieForm(props: MovieFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: props.movie?.name ?? "",
      releasedYear: props.movie?.releasedYear ?? "",
      url: props.movie?.url ?? "",
      rating: props.movie?.details.rating ?? "",
      duration: props.movie?.details.duration ?? "",
      description: props.movie?.details.description ?? "",
      genre: props.movie?.genres[0] ?? "",
    },
  });

  return (
    <form
      className={styles.EditForm}
      onSubmit={handleSubmit(props.onSubmit)}
      onReset={() => reset}
    >
      <h2>{props.formTitle}</h2>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>TITLE</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Too short" },
            })}
          />
        </div>
        <div className={styles.field}>
          <label>RELEASE DATE</label>
          <div className={styles.iconInput}>
            <input type="text" {...register("releasedYear")} />
            <FaCalendarAlt />
          </div>
        </div>

        <div className={styles.field}>
          <label>MOVIE URL</label>
          <input type="text" {...register("url")} />
        </div>
        <div className={styles.field}>
          <label>RATING</label>
          <input type="text" {...register("rating")} />
        </div>

        <div className={styles.field}>
          <label>GENRE</label>
          <div className={styles.iconInput}>
            <select {...register("genre")}>
              <option value="">{`Select Genre`}</option>
              {genreList.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <FaChevronDown />
          </div>
        </div>
        <div className={styles.field}>
          <label>RUNTIME</label>
          <input type="text" {...register("duration")} />
        </div>
      </div>

      <div className={styles.fieldFull}>
        <label>OVERVIEW</label>
        <textarea rows={6} {...register("description")} />
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
