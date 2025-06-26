import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { SearchForm, type SearchFormProps } from "../SearchForm";

describe("SearchForm component", () => {
  const defaultProps: SearchFormProps = {
    initialQuery: "hello",
    onSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input with initialQuery", () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("hello");
  });

  it("after typing and clicking the Search button, calls onSearch with the new value", () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "new query" } });
    expect(input.value).toBe("new query");

    fireEvent.click(button);
    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSearch).toHaveBeenCalledWith("new query");
  });

  it("after typing and pressing Enter, calls onSearch with the new value", () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "enter query" } });
    expect(input.value).toBe("enter query");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSearch).toHaveBeenCalledWith("enter query");
  });
});
