import { useLoaderData, useOutletContext } from "react-router-dom";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { MovieDetails } from "../MovieDetails/MovieDetails";

interface MovieDetailsContextType {
  showSearch: () => void;
}

export function MovieDetailsWrapper() {
  const { showSearch } = useOutletContext<MovieDetailsContextType>();

  const movie = useLoaderData() as Movie;

  return (
    <MovieDetails movie={movie} onShowSearchForm={showSearch}></MovieDetails>
  );
}
