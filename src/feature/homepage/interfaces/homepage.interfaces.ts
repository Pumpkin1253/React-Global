
export interface Movie {
  id: string;
  image: string;
  name: string;
  releasedYear: string;
  genres: string[];
  details: MovieDetailsIE;
  url: string;
}

export interface MovieDetailsIE {
  rating: string;
  duration: string;
  description: string;
}

export interface FormValues {
  title: string;
  releasedYear: string;
  url: string;
  rating: string;
  duration: string;
  description: string;
  genre: string;
};

export interface ApiData {
  data: ApiMovie[];
  limit: number;
  offset: number;
  totalAmount: number;
}

export interface ApiMovie {
  id: number;
  budget: number;
  genres: string[];
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: number;
  title: string;
  vote_average: number;
  vote_count: number;
}