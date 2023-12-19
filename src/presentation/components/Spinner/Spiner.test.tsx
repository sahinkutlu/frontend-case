import { render, screen } from "@application/utils/test-utils";

import Spinner from "./Spinner";

describe("spinner", () => {
  it("should render the spinner", () => {
    const view = render(<Spinner />);
    expect(view).toBeTruthy();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
