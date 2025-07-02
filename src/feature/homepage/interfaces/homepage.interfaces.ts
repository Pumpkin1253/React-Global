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
}

export interface MovieDetailsIE {
  rating: string;
  duration: string;
  description: string;
}

export type SortOption = "releaseDate" | "title";