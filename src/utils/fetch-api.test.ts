import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchApi } from "@/utils/fetch-api";
import { API_URL } from "@/config";

describe("fetchApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("should return data for a successful API call", async () => {
    const mockResponse = { data: "test" };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const path = "/api/test";
    const data = await fetchApi(path);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
      },
    });
    expect(data).toEqual(mockResponse);
  });

  it("should throw an error for a non-OK response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    const path = "/api/test";
    await expect(fetchApi(path)).rejects.toThrow(
      `API call failed: ${API_URL}${path} - 404 - Not Found`,
    );
  });

  it("should handle network errors", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const path = "/api/test";
    await expect(fetchApi(path)).rejects.toThrow("Network error");
  });
});
