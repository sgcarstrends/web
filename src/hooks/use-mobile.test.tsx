import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let mockMatchMedia: any;
  let mockAddEventListener: any;
  let mockRemoveEventListener: any;

  beforeEach(() => {
    mockAddEventListener = vi.fn();
    mockRemoveEventListener = vi.fn();
    
    mockMatchMedia = vi.fn().mockImplementation(() => ({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return true when window width is less than 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should return false when window width is 768px or greater", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("should return false when window width is exactly 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("should set up media query listener with correct breakpoint", () => {
    renderHook(() => useIsMobile());

    expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("should update when media query changes", () => {
    let mediaQueryCallback: any;
    
    mockAddEventListener.mockImplementation((event, callback) => {
      if (event === "change") {
        mediaQueryCallback = callback;
      }
    });

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Simulate window resize to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });
      mediaQueryCallback();
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("should handle edge case at breakpoint boundary", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should start with undefined and then set correct value", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());

    // The hook returns !!isMobile, so even if initially undefined, it becomes false
    // But after the effect runs, it should be true for mobile
    expect(result.current).toBe(true);
  });
});