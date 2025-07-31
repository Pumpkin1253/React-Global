import { render, screen, fireEvent } from "@testing-library/react";
import styles from "./../GenreList.module.scss";
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

  const genres = ["All", "Documentary", "Comedy"];
  const selectedGenre = genres[1];
  const onSelectGenre = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all genres passed in props", () => {
    renderComponent();
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it("highlights the selected genre passed in props", () => {
    renderComponent();
    const selectedElement = screen.getByText(selectedGenre);
    expect(selectedElement).toHaveClass(styles.genreListItemSelected);
  });

  it("calls onSelectGenre callback with correct genre on click", () => {
    renderComponent();
    const genreToClick = genres[0];

    const genreElement = screen.getByText(genreToClick);
    fireEvent.click(genreElement);

    expect(onSelectGenre).toHaveBeenCalledTimes(1);
    expect(onSelectGenre).toHaveBeenCalledWith(genreToClick);
  });
});
