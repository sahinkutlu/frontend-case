import { render, screen } from "@application/utils/test-utils";

import ErrorBox from "./ErrorBox";

const DUMMY_ERROR = "Connection Error with 400 code.";

describe("error", () => {
  it("should render the error widget with the given message", () => {
    const view = render(<ErrorBox message={DUMMY_ERROR} />);
    expect(view).toBeTruthy();

    const container = screen.getByRole("alert");
    const message = screen.getByText(DUMMY_ERROR);

    expect(container).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
