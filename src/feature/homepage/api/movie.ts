import axios from "axios";
import type { Movie } from "../interfaces/homepage.interfaces";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function movieLoader({ params }: LoaderFunctionArgs) {
  const { movieId } = params
  const response = await axios.get<Movie>(`http://localhost:4000/movies/${movieId}`).then(res => res.data)

return response;
}

export const addMovie = async (movie: unknown): Promise<Movie> => {
  const response = await axios.post<Movie>("http://localhost:4000/movies", movie).then(res => res.data);

  return response;
}

export const editMovie = async (movie: Movie): Promise<Movie> => {

  const response = await axios.put<Movie>(`http://localhost:4000/movies`, movie).then(res => res.data);

  return response;
}

export const deleteMovie = async (movieId: string): Promise<Movie> => {

  const response = await axios.delete<Movie>(`http://localhost:4000/movies/${movieId}`).then(res => res.data);

  return response;
}
