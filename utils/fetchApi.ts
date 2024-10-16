export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const defaultOptions: RequestInit = {
    // TODO: Remove this later
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(
        `API call failed: ${url} - ${response.status} - ${response.statusText}`,
      );
    }

    return response.json();
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
