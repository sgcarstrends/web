import fetch from "jest-fetch-mock";
import { fetchApi } from "@/utils/fetchApi";

describe("fetchApi", () => {
  beforeEach(() => fetch.resetMocks());

  it("should return data for a successful API call", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "test" }));

    const url = "https://example.com/api/test";
    const data = await fetchApi(url);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual({ data: "test" });
  });
});
