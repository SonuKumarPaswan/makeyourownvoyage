const BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export interface ApiFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => null);
    let errorMessage = `API request failed with status ${response.status}: ${response.statusText}`;
    try {
      if (errorBody) {
        const parsed = JSON.parse(errorBody);
        errorMessage = parsed.message || parsed.error || errorMessage;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export default apiFetch;
