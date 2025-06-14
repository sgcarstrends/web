import { API_URL } from "@/config";

export const fetchApi = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${API_URL}${path}`;
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
};
