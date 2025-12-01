import { renderHook, act } from "@testing-library/react";
import { useJobBoardDrag } from "../../hooks/useJobBoardDrag";
import { vi } from "vitest";
import type { DragEndEvent } from "@dnd-kit/core";

vi.mock("../../data/repo", () => ({
  upsertApp: vi.fn(),
}));

type DragEvent = {
  active: { id: string };
  over: { id: string };
};

describe("reorder test", () => {
  test("reorders items when dropped on another job", () => {
    const initial = [
      { id: "1", title: "A", stage: "applied" as const },
      { id: "2", title: "B", stage: "applied" as const },
    ];

    const setApps = vi.fn((fn) => fn(initial));

    const { result } = renderHook(() => useJobBoardDrag(setApps));
    const { handleDragEnd } = result.current;

    const event: MinimalDragEvent = {
      active: { id: "2" },
      over: { id: "1" },
    };

    act(() => handleDragEnd(event as DragEndEvent));

    const updated = setApps.mock.calls[0][0](initial);

    expect(updated[0].id).toBe("2");
    expect(updated[1].id).toBe("1");
  });

  test("changes stage when dropped on a stage column", () => {
    const initial = [
      { id: "1", title: "A", stage: "applied" as const },
      { id: "2", title: "B", stage: "applied" as const },
    ];

    const setApps = vi.fn((fn) => fn(initial));

    const { result } = renderHook(() => useJobBoardDrag(setApps));
    const { handleDragEnd } = result.current;

    const event: DragEvent = {
      active: { id: "1" },
      over: { id: "interview" },
    };

    act(() => handleDragEnd(event as DragEndEvent));

    const updated = setApps.mock.calls[0][0](initial);

    expect(updated[0].stage).toBe("interview");
  });
});
