export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `API call failed: ${url} - ${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};
