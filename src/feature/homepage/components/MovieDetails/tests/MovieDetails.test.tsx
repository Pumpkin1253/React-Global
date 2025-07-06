import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MovieDetails } from "../MovieDetails";
import { movieMock } from "../../../../../core/utils/tests/stub";

describe("<MovieDetails />", () => {
  it("renders movie details correctly", () => {
    render(<MovieDetails movie={movieMock} onShowSearchForm={() => {}} />);

    expect(screen.getByText(movieMock.name)).toBeInTheDocument();
    expect(screen.getByText(movieMock.details.rating)).toBeInTheDocument();
    expect(screen.getByText("Adventure, Drama")).toBeInTheDocument();
    expect(screen.getByText(movieMock.releasedYear)).toBeInTheDocument();
    expect(screen.getByText(movieMock.details.duration)).toBeInTheDocument();
    expect(screen.getByText(movieMock.details.description)).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", movieMock.image);
  });

  it("calls onShowSearchForm when search button is clicked", () => {
    const onShowSearchForm = vi.fn();
    render(
      <MovieDetails movie={movieMock} onShowSearchForm={onShowSearchForm} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onShowSearchForm).toHaveBeenCalled();
  });
});
