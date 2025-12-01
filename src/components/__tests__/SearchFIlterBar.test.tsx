import { render, screen } from "@testing-library/react";
import SearchFilterBar from "../SearchFilterBar";

test("renders", () => {
  render(
    <SearchFilterBar
      filter={{ search: "", stage: "all", tag: "all" }}
      onChange={() => {}}
      allTags={["frontend", "backend"]}
    />
  );

  expect(screen.getByLabelText("Search title")).toBeInTheDocument();
  expect(screen.getByLabelText("Stage")).toBeInTheDocument();
  expect(screen.getByLabelText("Tag")).toBeInTheDocument();
});
