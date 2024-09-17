export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  options = {
    ...options,
    // TODO: Remove this later
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
    },
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `API call failed: ${url} - ${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};
