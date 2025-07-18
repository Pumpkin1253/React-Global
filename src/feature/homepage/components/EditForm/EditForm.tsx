import { genreList } from "../../constants/homepage.constants";
import type { FormValues, Movie } from "../../interfaces/homepage.interfaces";
import { MovieForm } from "../MovieForm";
export interface EditFormProps {
  movie: Movie;
  movieList: Movie[];
  onEditMovie: (updatedMovieList: Movie[]) => void;
}

export function EditForm(props: EditFormProps) {
  const formTitle = "Edit Movie";

  const onSubmit = (data: FormValues) => {
    const selectedGenre = genreList.find((genre) => genre.id === data.genreId);
    const updatedMovie = {
      ...props.movie,
      name: data.title,
      releasedYear: data.releasedYear,
      genres: selectedGenre ? [selectedGenre] : [],
      url: data.url,
      details: {
        rating: data.rating,
        duration: data.duration,
        description: data.description,
      },
    };

    props.onEditMovie(
      props.movieList.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  return (
    <MovieForm
      formTitle={formTitle}
      movie={props.movie}
      onSubmit={onSubmit}
    ></MovieForm>
  );
}
