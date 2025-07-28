import axios from "axios";
import type { Movie, ApiData } from "../interfaces/homepage.interfaces";

export const fetchMovies = async ({
  searchQuery,
  genreFilter,
  sortOption,
}: {
  searchQuery: string;
  genreFilter: string;
  sortOption: string;
}): Promise<Movie[]> => {
  const params = new URLSearchParams();
  if (searchQuery) params.set("search", searchQuery);
  params.set("searchBy", "title");
  if (sortOption) params.set("sortBy", sortOption);
  params.set("sortOrder", "asc");
  if (genreFilter && genreFilter !== "All") params.set("filter", genreFilter);

  const response = await axios.get<ApiData>("http://localhost:4000/movies", {
    params,
  });

  return response.data.data.map((apiMovie) => ({
    id: apiMovie.id.toString(),
    image: apiMovie.poster_path,
    name: apiMovie.title,
    releasedYear: apiMovie.release_date,
    genres: apiMovie.genres,
    url: "",
    details: {
      rating: apiMovie.vote_average.toString(),
      duration: formatDuration(apiMovie.runtime),
      description: apiMovie.overview,
    },
  }));
};

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${minutes}m`;
  };