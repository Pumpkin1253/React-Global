import { useState } from "react";
import { SearchForm } from "../SearchForm";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import {
  genreList,
  type ModalType,
  type SortOption,
} from "../../constants/homepage.constants";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { MovieDetails } from "../MovieDetails";
import { SortControl } from "../SortControl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies } from "../../api/movies";
import { ModalWrapper } from "../ModalWrapper";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>(genreList[0]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("release_date");

  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const {
    data: movieList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", searchQuery, genreFilter, sortOption],
    queryFn: () =>
      fetchMovies({
        searchQuery,
        genreFilter,
        sortOption,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError && error instanceof Error) return <p>Error: {error.message}</p>;

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const selectGenre = (selectedGenre: string) => {
    setGenreFilter(selectedGenre);
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

  const updateMovieList = (newMovieList: Movie[]) => {
    queryClient.setQueryData<Movie[]>(
      ["movies", searchQuery, genreFilter, sortOption],
      newMovieList
    );
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
          selectedGenre={genreFilter}
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
