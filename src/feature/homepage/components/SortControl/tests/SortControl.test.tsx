import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SortControl, type SortControlProps } from "../SortControl";

describe("<SortControl />", () => {
  const mockChange = vi.fn();
  const defaultProps: SortControlProps = {
    sortBy: "releaseDate",
    onChange: mockChange,
  };

  it("renders label and select with correct default value", () => {
    render(<SortControl {...defaultProps} />);

    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Release Date")).toBeInTheDocument();
  });

  it("calls onChange with new value when selection changes", () => {
    render(<SortControl {...defaultProps} />);

    const select = screen.getByLabelText("Sort by") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "title" } });

    expect(mockChange).toHaveBeenCalledWith("title");
  });
});
