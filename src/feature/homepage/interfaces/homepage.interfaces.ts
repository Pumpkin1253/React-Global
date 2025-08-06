
export interface Movie {
  id: number;
  budget: number;
  genres: string[];
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface FormValues {
  title: string;
  release_date: string;
  url: string;
  vote_average: number;
  runtime: number;
  overview: string;
  genre: string;
};

export interface ApiData {
  data: Movie[];
  limit: number;
  offset: number;
  totalAmount: number;
}
