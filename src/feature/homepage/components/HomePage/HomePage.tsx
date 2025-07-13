import { useMemo, useState } from "react";
import { SearchForm } from "../SearchForm";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import {
  genreList,
  movieData,
  type ModalType,
} from "../../constants/homepage.constants";
import type {
  Genre,
  Movie,
  SortOption,
} from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { MovieDetails } from "../MovieDetails";
import { SortControl } from "../SortControl";
import { ModalWrapper } from "../ModalWrapper";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const [movieList, setMovieList] = useState<Movie[]>(movieData);
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [genre, setGenre] = useState<Genre>(genreList[0]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("releaseDate");

  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  useMemo(() => {
    let sorted = [];

    if (sortOption == "releaseDate") {
      sorted = movieList.sort(
        (a, b) => parseInt(a.releasedYear) - parseInt(b.releasedYear)
      );
    } else {
      sorted = movieList.sort((a, b) => a.name.localeCompare(b.name));
    }
    setMovieList(sorted);
  }, [sortOption, movieList]);

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

  const showDeleteForm = (movie: Movie) => {
    setModalType("delete");
    setCurrentMovie(movie);
  };

  const showEditForm = (movie: Movie) => {
    setModalType("edit");
    setCurrentMovie(movie);
  };

  const showAddForm = () => {
    setModalType("add");
  };

  const getLastMovieId = (): string => {
    if (movieList.length === 0) return "0";

    return movieList.reduce((currentMax, movie) => {
      const a = BigInt(currentMax);
      let b: bigint;
      try {
        b = BigInt(movie.id);
      } catch {
        return movie.id > currentMax ? movie.id : currentMax;
      }
      return b > a ? movie.id : currentMax;
    }, movieList[0].id);
  };

  const updateMovieList = (newMovieList: Movie[]) => {
    setMovieList(newMovieList);
    setModalType(null);
  };

  return (
    <div className={styles.homepage}>
      {movieDetails ? (
        <MovieDetails
          movie={movieDetails}
          onShowSearchForm={showSearch}
        ></MovieDetails>
      ) : (
        <div className={styles.header}>
          <button className={styles.headerButton} onClick={showAddForm}>
            +
          </button>
          <SearchForm initialQuery={searchQuery} onSearch={search}></SearchForm>
        </div>
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
        movieList={movieList}
        onMovieDetails={selectMovie}
        onDeleteMovie={showDeleteForm}
        onEditMovie={showEditForm}
      ></MovieList>

      {modalType && (
        <ModalWrapper
          modalType={modalType}
          movie={currentMovie}
          lastMovieId={getLastMovieId()}
          movieList={movieList}
          submitModal={updateMovieList}
          onClose={() => {
            setModalType(null);
          }}
        ></ModalWrapper>
      )}
    </div>
  );
}
