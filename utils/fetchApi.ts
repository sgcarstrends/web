export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${process.env.SG_CARS_TRENDS_API_TOKEN}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API call failed: ${url} - ${response.status} - ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(
      `Fetch error: ${error instanceof Error ? error.message : error}`,
    );
    throw error;
  }
};
