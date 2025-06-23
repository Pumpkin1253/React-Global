import { useState } from "react";
import { Counter } from "../Counter";
import { SearchForm } from "../SearchForm";
import "./HomePage.scss";
import { GenreList } from "../GenreList";
import { genreList } from "../../constants/homepage.constants";
import type { Genre } from "../../interfaces/homepage.interfaces";

export interface HomePageProps {
  prop?: string;
}

export function HomePage() {
  const [searchQuery, setsearchQuery] = useState<string>("testQuery");
  const [genre, setGenre] = useState<Genre>(genreList[0]);

  const search = (query: string) => {
    setsearchQuery(query);
  };

  const selectGenre = (genre: Genre) => {
    setGenre(genre);
  };

  return (
    <div className="homepage">
      <SearchForm initialQuery={searchQuery} onSearch={search}></SearchForm>
      <div>You've searched for {searchQuery}</div>

      <GenreList
        genres={genreList}
        selectedGenre={genre}
        onSelectGenre={selectGenre}
      ></GenreList>
      <div>You've selected {genre.name} genre(s)</div>

      <div className="homepage__counter">
        <Counter initialValue={0}></Counter>
      </div>
    </div>
  );
}
