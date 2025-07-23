import { useEffect, useState } from "react";
import { SearchForm } from "../SearchForm";
import styles from "./HomePage.module.scss";
import { GenreList } from "../GenreList";
import {
  genreList,
  type ModalType,
  type SortOption,
} from "../../constants/homepage.constants";
import type { ApiData, Movie } from "../../interfaces/homepage.interfaces";
import { MovieList } from "../MovieList";
import { MovieDetails } from "../MovieDetails";
import { SortControl } from "../SortControl";
import { ModalWrapper } from "../ModalWrapper";
import axios from "axios";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>(genreList[0]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("release_date");

  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        params.set("searchBy", "title");
        if (sortOption) params.set("sortBy", sortOption);
        params.set("sortOrder", "asc");
        if (genreFilter && genreFilter !== "All")
          params.set("filter", genreFilter);
        params.set("sortOrder", "asc");

        const response = await axios.get<ApiData>(
          `http://localhost:4000/movies`,
          {
            params,
            signal: controller.signal,
          }
        );

        setMovieList(
          response.data.data.map((apiMovie) => ({
            id: apiMovie.id.toString(),
            image: apiMovie.poster_path,
            name: apiMovie.title,
            releasedYear: apiMovie.release_date,
            genres: apiMovie.genres,
            url: "",
            details: {
              rating: apiMovie.vote_average.toString(),
              duration: formatDuration(apiMovie.runtime),
              description: apiMovie.overview,
            },
          }))
        );
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error("Fetch error:", err);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [searchQuery, genreFilter, sortOption]);

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
    setMovieList(newMovieList);
    setModalType(null);
  };

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${minutes}m`;
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
