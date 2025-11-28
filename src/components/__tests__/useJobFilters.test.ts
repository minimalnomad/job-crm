import { renderHook, act } from "@testing-library/react";
import { mockJobApps } from "../../components/mocks/JobApp.mock";
import { useJobFilters } from "../../hooks/useJobFilters";

describe("useJobFilters", () => {
  test("returns all apps when no filters applied", () => {
    const { result } = renderHook(() => useJobFilters(mockJobApps));
    expect(result.current.filteredApps.length).toBe(2);
  });

  test("filters by search", () => {
    const { result } = renderHook(() => useJobFilters(mockJobApps));

    act(() => {
      result.current.setFilter((f) => ({ ...f, search: "google" }));
    });

    expect(result.current.filteredApps.length).toBe(1);
    expect(result.current.filteredApps[0].company).toBe("Google");
  });

  test("filters by stage", () => {
    const { result } = renderHook(() => useJobFilters(mockJobApps));

    act(() => {
      result.current.setFilter((f) => ({ ...f, stage: "interview" }));
    });

    expect(result.current.filteredApps.length).toBe(1);
    expect(result.current.filteredApps[0].stage).toBe("interview");
  });

  test("filters by tag", () => {
    const { result } = renderHook(() => useJobFilters(mockJobApps));

    act(() => {
      result.current.setFilter((f) => ({ ...f, tag: "frontend" }));
    });

    expect(result.current.filteredApps.length).toBe(1);
    expect(result.current.filteredApps[0].tags).toContain("frontend");
  });

  test("combined filters", () => {
    const { result } = renderHook(() => useJobFilters(mockJobApps));

    act(() => {
      result.current.setFilter({
        search: "engineer",
        stage: "applied",
        tag: "frontend",
      });
    });

    expect(result.current.filteredApps.length).toBe(1);
    expect(result.current.filteredApps[0].id).toBe("1");
  });
});
