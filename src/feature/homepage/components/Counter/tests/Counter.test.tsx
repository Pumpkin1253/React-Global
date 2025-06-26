import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Counter } from "../Counter";

describe("Counter component", () => {
  it("renders with initial value", () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("increments on + button click", () => {
    render(<Counter initialValue={0} />);
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("decrements on – button click", () => {
    render(<Counter initialValue={2} />);
    fireEvent.click(screen.getByText("–"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
