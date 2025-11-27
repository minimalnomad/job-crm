import { render, screen, fireEvent } from "@testing-library/react";
import JobAppCard from "../JobAppCard";
import "@testing-library/jest-dom";
import { createMockJob } from "../mocks/JobApp.mock";
import { vi } from "vitest";

test("renders job title & company", () => {
  const job = createMockJob({
    title: "Frontend Engineer",
    company: "Google",
  });

  render(<JobAppCard job={job} />);

  expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
  expect(screen.getByText("Google")).toBeInTheDocument();
});

test("delete button triggers callback", () => {
  const job = createMockJob();
  const onDelete = vi.fn();

  render(<JobAppCard job={job} onDelete={onDelete} />);

  fireEvent.click(screen.getByRole("button", { name: /delete/i }));

  expect(onDelete).toHaveBeenCalledTimes(1);
});
