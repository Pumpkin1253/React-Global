export interface Genre {
    name: string;
    id: string;
}

export interface Movie {
  id: string;
  image: string;
  name: string;
  releasedYear: string;
  genres: Genre[];
  details: MovieDetailsIE;
  url: string;
}

export interface MovieDetailsIE {
  rating: string;
  duration: string;
  description: string;
}

export type SortOption = "releaseDate" | "title";

export interface FormValues {
  title: string;
  releasedYear: string;
  url: string;
  rating: string;
  duration: string;
  description: string;
  genreId: string;
};