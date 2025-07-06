import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MovieList } from "../MovieList";
import { movieListMock } from "../../../../../core/utils/tests/stub";

describe("<MovieList />", () => {
  it("renders correct movie count", () => {
    render(<MovieList movieList={movieListMock} onClickMovie={() => {}} />);
    expect(screen.getByText("2 movies found")).toBeInTheDocument();
  });

  it("renders all movie tiles", () => {
    render(<MovieList movieList={movieListMock} onClickMovie={() => {}} />);
    expect(screen.getByText("The Great Escape")).toBeInTheDocument();
    expect(screen.getByText("Laugh Out Loud")).toBeInTheDocument();
  });

  it("calls onClickMovie when a movie tile is clicked", () => {
    const mockClick = vi.fn();
    render(<MovieList movieList={movieListMock} onClickMovie={mockClick} />);
    fireEvent.click(screen.getByText("The Great Escape"));
    expect(mockClick).toHaveBeenCalledWith(movieListMock[0]);
  });
});
