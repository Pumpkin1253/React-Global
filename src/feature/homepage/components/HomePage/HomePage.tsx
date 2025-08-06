import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import { genreList, type SortOption } from "../../constants/homepage.constants";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { SortControl } from "../SortControl";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/movies";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>(genreList[0]);
  const [sortOption, setSortOption] = useState<SortOption>("release_date");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    refetch,
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
    navigate(`${movie.id}${location.search}`);
  };

  const showSearch = () => {
    navigate("/");
  };

  const sortControlChange = (value: SortOption) => {
    setQueryParam("sortBy", value);
  };

  const showDeleteForm = (movie: Movie) => {
    navigate(`/delete/${movie.id}${location.search}`);
  };

  const showEditForm = (movie: Movie) => {
    navigate(`/edit/${movie.id}${location.search}`);
  };

  const showAddForm = () => {
    navigate(`/new${location.search}`);
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
    onCloseModal: () => {
      navigate(`/${location.search}`);
    },
    onSubmitModal: () => {
      refetch();
      navigate(`/${location.search}`);
    },
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
    </div>
  );
}
