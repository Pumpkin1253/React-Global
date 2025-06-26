import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { HomePage } from "../HomePage";
describe("HomePage component", () => {
  it("render component", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
