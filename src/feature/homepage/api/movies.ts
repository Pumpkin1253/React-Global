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

  return response.data.data;
};

