import fetchMock from 'jest-fetch-mock';
import { handler } from './handler';

beforeEach(() => {
  fetchMock.resetMocks();
  process.env.WEATHER_API_KEY = 'mock-key'; // ✅ fake key, won't be used
});

test('returns 200 for valid city with mocked data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'London', temp: 72 }));

  const event = {
    httpMethod: 'GET',
    queryStringParameters: { city: 'London' },
  };

  const result = await handler(event as any);

  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body)).toEqual({ name: 'London', temp: 72 });
});

test('returns 400 for invalid city name', async () => {
  const event = {
    httpMethod: 'GET',
    queryStringParameters: { city: '1234' },
  };
  const result = await handler(event as any);
  expect(result.statusCode).toBe(400);
  expect(JSON.parse(result.body)).toEqual({ message: 'Invalid city name.' });
});

test('returns 400 for missing query params', async () => {
  const event = {
    httpMethod: 'GET',
    queryStringParameters: null,
  };
  const result = await handler(event as any);
  expect(result.statusCode).toBe(400);
  expect(JSON.parse(result.body)).toEqual({ message: 'Missing city or coordinates.' });
});

test('returns 400 for invalid coordinates', async () => {
  const event = {
    httpMethod: 'GET',
    queryStringParameters: { lat: 'abc', lon: 'xyz' },
  };
  const result = await handler(event as any);
  expect(result.statusCode).toBe(400);
  expect(JSON.parse(result.body)).toEqual({ message: 'Invalid coordinates.' });
});

test('returns 200 for valid coordinates with mocked data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'CoordsCity', temp: 65 }));

  const event = {
    httpMethod: 'GET',
    queryStringParameters: { lat: '35', lon: '-120' },
  };

  const result = await handler(event as any);
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body)).toEqual({ name: 'CoordsCity', temp: 65 });
});

test('returns 400 if city not found', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({ message: 'City not found' }),
    { status: 404 }
  );

  const event = {
    httpMethod: 'GET',
    queryStringParameters: { city: 'GhostTown' },
  };

  const result = await handler(event as any);
  expect(result.statusCode).toBe(404);
  expect(JSON.parse(result.body)).toEqual({ message: 'City not found' });
});

test('returns 200 for OPTIONS preflight request', async () => {
  const event = {
    httpMethod: 'OPTIONS',
    queryStringParameters: {},
  };
  const result = await handler(event as any);
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body)).toEqual({});
});
