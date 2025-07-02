import { useState } from "react";
// import { Counter } from "../Counter";
import { SearchForm } from "../SearchForm";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import { genreList, movieData } from "../../constants/homepage.constants";
import type {
  Genre,
  Movie,
  SortOption,
} from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { MovieDetails } from "../MovieDetails";
import { SortControl } from "../SortControl";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [genre, setGenre] = useState<Genre>(genreList[0]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("releaseDate");

  const search = (query: string) => {
    setsearchQuery(query);
  };

  const selectGenre = (genre: Genre) => {
    setGenre(genre);
  };

  const selectMovie = (movie: Movie) => {
    setMovieDetails(movie);
  };

  const showSearch = () => {
    setMovieDetails(null);
  };

  const sortControlChange = (value: SortOption) => {
    setSortOption(value);
  };

  const sortedMovieData = (): Movie[] => {
    if (sortOption == "releaseDate") {
      return movieData.sort(
        (a, b) => parseInt(a.releasedYear) - parseInt(b.releasedYear)
      );
    } else {
      return movieData.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  return (
    <div className={styles.homepage}>
      {movieDetails ? (
        <MovieDetails
          movie={movieDetails}
          onShowSearchForm={showSearch}
        ></MovieDetails>
      ) : (
        <SearchForm initialQuery={searchQuery} onSearch={search}></SearchForm>
      )}

      <div className={styles.homepageControls}>
        <GenreList
          genres={genreList}
          selectedGenre={genre}
          onSelectGenre={selectGenre}
        ></GenreList>

        <SortControl
          sortBy={sortOption}
          onChange={sortControlChange}
        ></SortControl>
      </div>

      <MovieList
        movieList={sortedMovieData()}
        onClickMovie={selectMovie}
      ></MovieList>

      {/* <div className={styles.homepageCounter}>
        <Counter initialValue={0}></Counter>
      </div> */}
    </div>
  );
}
