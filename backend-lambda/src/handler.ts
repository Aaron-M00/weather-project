import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const buildResponse = (statusCode: number, body: object): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  },
  body: JSON.stringify(body),
});

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return buildResponse(200, {});
  }

  let lat: number | null = null;
  let lon: number | null = null;
  let city: string | null = null;

  try {
    const params = event.queryStringParameters || {};

    if (params.city) {
      city = params.city.trim();
      if (!city || !/^[a-zA-Z\s-]{2,}$/.test(city)) {
        return buildResponse(400, { message: 'Invalid city name.' });
      }
    } else if (params.lat && params.lon) {
      lat = parseFloat(params.lat);
      lon = parseFloat(params.lon);
      if (isNaN(lat) || isNaN(lon)) {
        return buildResponse(400, { message: 'Invalid coordinates.' });
      }
    } else {
      return buildResponse(400, { message: 'Missing city or coordinates.' });
    }

    if (!WEATHER_API_KEY) {
      return buildResponse(500, { message: 'Missing weather API key.' });
    }

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const query = city
      ? `q=${encodeURIComponent(city)}`
      : `lat=${lat}&lon=${lon}`;
    const weatherUrl = `${baseUrl}?${query}&appid=${WEATHER_API_KEY}&units=imperial`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
      const errorBody = await response.json();
      return buildResponse(response.status, { message: errorBody.message });
    }

    const data = await response.json();
    return buildResponse(200, data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return buildResponse(500, { message });
  }
};
