import images from "../../../../assets";
import { genreList } from "../../constants/homepage.constants";
import type { FormValues, Movie } from "../../interfaces/homepage.interfaces";
import { MovieForm } from "../MovieForm";

export interface AddFormProps {
  movieList: Movie[];
  onAddMovie: (updatedMovieList: Movie[]) => void;
}

export function AddForm(props: AddFormProps) {
  const formTitle = "Add Movie";

  const getLastMovieId = (): string => {
    if (props.movieList.length === 0) return "0";

    return props.movieList.reduce((currentMax, movie) => {
      const a = BigInt(currentMax);
      let b: bigint;
      try {
        b = BigInt(movie.id);
      } catch {
        return movie.id > currentMax ? movie.id : currentMax;
      }
      return b > a ? movie.id : currentMax;
    }, props.movieList[0].id);
  };

  const onSubmit = (data: FormValues) => {
    const selectedGenre = genreList.find((genre) => genre === data.genre);
    const countId = parseInt(getLastMovieId()) + 1;

    const newMovie = {
      id: countId.toString(),
      image: images.new,
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

    const newMovieList = props.movieList;
    newMovieList.push(newMovie);
    props.onAddMovie(newMovieList);
  };

  return <MovieForm formTitle={formTitle} onSubmit={onSubmit}></MovieForm>;
}
