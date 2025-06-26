import { render, screen, fireEvent } from "@testing-library/react";
import styles from "./../GenreList.module.scss";
import type { Genre } from "../../../interfaces/homepage.interfaces";
import { GenreList } from "../GenreList";
import { vi } from "vitest";

describe("GenreList component", () => {
  const renderComponent = () =>
    render(
      <GenreList
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
      />
    );

  const genres: Genre[] = [
    { id: "1", name: "Action" },
    { id: "2", name: "Comedy" },
    { id: "3", name: "Drama" },
  ];
  const selectedGenre = genres[1];
  const onSelectGenre = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all genres passed in props", () => {
    renderComponent();
    genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  it("highlights the selected genre passed in props", () => {
    renderComponent();
    const selectedElement = screen.getByText(selectedGenre.name);
    expect(selectedElement).toHaveClass(styles.genreListItemSelected);
  });

  it("calls onSelectGenre callback with correct genre on click", () => {
    renderComponent();
    const genreToClick = genres[0];

    const genreElement = screen.getByText(genreToClick.name);
    fireEvent.click(genreElement);

    expect(onSelectGenre).toHaveBeenCalledTimes(1);
    expect(onSelectGenre).toHaveBeenCalledWith(genreToClick);
  });
});
