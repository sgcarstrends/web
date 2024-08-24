export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  options = {
    ...options,
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

  console.log("API call:", url);

  return response.json();
};
