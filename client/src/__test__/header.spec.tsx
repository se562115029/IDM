import Header from "@/app/_components/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("Render a header", () => {
    render(<Header name={"Dashboard"}></Header>);
    const headerName = screen.getByText("Dashboard");
    expect(headerName).toBeInTheDocument();
  });
});
