import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import {
  genreList,
  type ModalType,
  type SortOption,
} from "../../constants/homepage.constants";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { SortControl } from "../SortControl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies } from "../../api/movies";
import { ModalWrapper } from "../ModalWrapper";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>(genreList[0]);
  const [sortOption, setSortOption] = useState<SortOption>("release_date");

  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setGenreFilter(searchParams.get("filter") || "");
    setSearchQuery(searchParams.get("search") || "");
    setSortOption((searchParams.get("sortBy") as SortOption) || "release_date");
  }, [searchParams]);

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
    setQueryParam("search", query);
  };

  const selectGenre = (selectedGenre: string) => {
    setQueryParam("filter", selectedGenre);
  };

  const selectMovie = (movie: Movie) => {
    navigate(`${movie.id}`);
  };

  const showSearch = () => {
    navigate("/");
  };

  const sortControlChange = (value: SortOption) => {
    setQueryParam("sortBy", value);
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

  const setQueryParam = (param: string, value: string | SortOption) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    setSearchParams(params);
  };

  const outletContext = {
    initialQuery: searchQuery,
    onSearch: search,
    onShowAddForm: showAddForm,
    showSearch: showSearch,
  };

  return (
    <div className={styles.homepage}>
      <Outlet context={outletContext} />

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
