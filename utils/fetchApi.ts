interface Options extends RequestInit {}

export const fetchApi = async <T>(
  url: string,
  options: Options = {},
): Promise<T> => {
  options = { cache: "no-store", ...options };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `API call failed: ${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};
