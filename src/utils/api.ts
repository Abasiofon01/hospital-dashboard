interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}

/**
 * Reusable fetch function with error handling
 * @param url - API endpoint URL
 * @param options - Fetch options (method, body, headers)
 * @returns Parsed JSON response
 */
export const apiFetch = async <T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  const { method = "GET", body, headers = {} } = options || {};

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.data as T;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
};

/**
 * Helper function to build query strings
 * @param params - Object with query parameters
 * @returns Formatted query string
 */
export const buildQueryString = (
  params: Record<string, string | number | boolean | undefined>
): string => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return query ? `?${query}` : "";
};
