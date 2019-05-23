import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

test("renders a message", () => {
    const { getByText } = render(<div>Placeholder</div>);
    expect(getByText("Placeholder")).toBeInTheDocument();
});
