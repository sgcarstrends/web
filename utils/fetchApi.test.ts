import fetch from "jest-fetch-mock";
import { fetchApi } from "@/utils/fetchApi";

describe("fetchApi", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should return data for a successful API call", async () => {
    const mockResponse = { data: "test" };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const url = "https://example.com/api/test";
    const data = await fetchApi(url);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
      },
    });
    expect(data).toEqual(mockResponse);
  });

  it("should throw an error for a non-OK response", async () => {
    const errorBody = "Error occurred";
    fetch.mockResponseOnce(errorBody, { status: 404, statusText: "Not Found" });

    const url = "https://example.com/api/test";
    await expect(fetchApi(url)).rejects.toThrow(
      `API call failed: ${url} - 404 - Not Found`,
    );
  });

  it("should merge custom options with default options", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "test" }));

    const url = "https://example.com/api/test";
    const customOptions = {
      method: "POST",
      headers: {
        "Custom-Header": "CustomValue",
      },
    };

    await fetchApi(url, customOptions);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
        "Custom-Header": "CustomValue",
      },
    });
  });

  it("should handle network errors", async () => {
    fetch.mockReject(new Error("Network error"));

    const url = "https://example.com/api/test";
    await expect(fetchApi(url)).rejects.toThrow("Network error");
  });
});
