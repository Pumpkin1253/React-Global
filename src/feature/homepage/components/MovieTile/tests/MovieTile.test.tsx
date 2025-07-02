import { render, screen, fireEvent } from "@testing-library/react";
import { MovieTile } from "../MovieTile";
import { describe, expect, it, vi } from "vitest";
import { movieMock } from "../../../../../core/utils/tests/stub";

describe("<MovieTile />", () => {
  it("renders movie name, genres, and release year", () => {
    const mockClick = vi.fn();
    render(<MovieTile movie={movieMock} onClickMovie={mockClick} />);

    expect(screen.getByText(movieMock.name)).toBeInTheDocument();
    expect(screen.getByText("Adventure, Drama")).toBeInTheDocument();
    expect(screen.getByText(movieMock.releasedYear)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", movieMock.image);
  });

  it("calls onClickMovie when clicked", () => {
    const mockClick = vi.fn();
    render(<MovieTile movie={movieMock} onClickMovie={mockClick} />);

    fireEvent.click(screen.getByRole("img"));
    expect(mockClick).toHaveBeenCalledWith(movieMock);
  });
});
