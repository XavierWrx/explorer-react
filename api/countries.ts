interface ApiRequest {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  json(body: unknown): ApiResponse;
  send(body: string): ApiResponse;
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
}

const COUNTRIES_API_URL = 'https://api.restcountries.com/countries/v5';
const QUERY_PARAMETERS = ['limit', 'offset', 'response_fields'] as const;

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
): Promise<void> {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({
      errors: [{ code: 'METHOD_NOT_ALLOWED', message: 'Solo se permite GET.' }],
    });
    return;
  }

  const apiKey = process.env.VITE_REST_COUNTRIES_API_KEY?.trim();
  if (!apiKey) {
    response.status(500).json({
      errors: [
        {
          code: 'MISSING_API_KEY',
          message: 'Configura la variable de REST Countries en Vercel.',
        },
      ],
    });
    return;
  }

  const query = new URLSearchParams();
  for (const parameter of QUERY_PARAMETERS) {
    const value = request.query?.[parameter];
    if (typeof value === 'string') {
      query.set(parameter, value);
    }
  }

  const url = query.size > 0
    ? `${COUNTRIES_API_URL}?${query}`
    : COUNTRIES_API_URL;

  try {
    const apiResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const contentType = apiResponse.headers.get('content-type');
    if (contentType) {
      response.setHeader('content-type', contentType);
    }
    response.status(apiResponse.status).send(await apiResponse.text());
  } catch {
    response.status(502).json({
      errors: [
        {
          code: 'UPSTREAM_UNAVAILABLE',
          message: 'No fue posible contactar REST Countries.',
        },
      ],
    });
  }
}
