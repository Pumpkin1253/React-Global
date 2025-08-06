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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: props.movie?.title ?? "",
      release_date: props.movie?.release_date ?? "",
      url: "",
      vote_average: props.movie?.vote_average ?? 0,
      runtime: props.movie?.runtime ?? 0,
      overview: props.movie?.overview ?? "",
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
          <div className={styles.fieldHeader}>
            <label>TITLE</label>

            {errors.title && (
              <div className={styles.error}>{errors.title.message}</div>
            )}
          </div>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Too short" },
            })}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label>RELEASE DATE</label>

            {errors.release_date && (
              <div className={styles.error}>{errors.release_date.message}</div>
            )}
          </div>
          <div className={styles.iconInput}>
            <input
              type="text"
              {...register("release_date", {
                required: "Release date is required",
              })}
            />
            <FaCalendarAlt />
          </div>
        </div>

        <div className={styles.field}>
          <label>MOVIE URL</label>
          <input type="text" {...register("url")} />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label>RATING</label>

            {errors.vote_average && (
              <div className={styles.error}>{errors.vote_average.message}</div>
            )}
          </div>
          <input
            type="text"
            {...register("vote_average", {
              required: "Rating is required",
              min: { value: 1, message: "Rating must be at least 1" },
            })}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label>GENRE</label>
            {errors.genre && (
              <div className={styles.error}>{errors.genre.message}</div>
            )}
          </div>
          <div className={styles.iconInput}>
            <select
              {...register("genre", {
                required: "Genre is required",
              })}
            >
              <option value="" disabled>
                Select Genre
              </option>
              {genreList.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <FaChevronDown />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldHeader}>
            <label>RUNTIME</label>

            {errors.runtime && (
              <div className={styles.error}>{errors.runtime.message}</div>
            )}
          </div>
          <input
            type="number"
            {...register("runtime", {
              required: "Runtime is required",
              min: { value: 10, message: "Runtime must be at least 10" },
            })}
          />
        </div>
      </div>

      <div className={styles.fieldFull}>
        <div className={styles.fieldHeader}>
          <label>OVERVIEW</label>

          {errors.overview && (
            <div className={styles.error}>{errors.overview.message}</div>
          )}
        </div>
        <textarea
          rows={6}
          {...register("overview", {
            required: "Overview is required",
          })}
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
