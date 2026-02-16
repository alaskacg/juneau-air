import axios from 'axios';

const NOAA_API_BASE = 'https://aviationweather.gov/api/data';

export interface WeatherData {
  metar: string;
  taf: string;
  ceiling_ft: number | null;
  visibility_miles: number | null;
  wind_speed_kts: number | null;
  wind_gust_kts: number | null;
  temperature_c: number | null;
  is_safe: boolean;
  blocked_reason: string | null;
}

export interface SafetyRules {
  min_ceiling_ft: number;
  min_visibility_miles: number;
  max_wind_kts: number;
}

const DEFAULT_SAFETY_RULES: SafetyRules = {
  min_ceiling_ft: 1000,
  min_visibility_miles: 3,
  max_wind_kts: 25,
};

export async function getWeather(icaoCode: string): Promise<WeatherData> {
  try {
    const metarResponse = await axios.get(`${NOAA_API_BASE}/metar`, {
      params: {
        ids: icaoCode,
        format: 'json',
      },
    });

    const tafResponse = await axios.get(`${NOAA_API_BASE}/taf`, {
      params: {
        ids: icaoCode,
        format: 'json',
      },
    });

    const metar = metarResponse.data[0]?.rawOb || '';
    const taf = tafResponse.data[0]?.rawTAF || '';

    const weatherData = parseWeather(metar);
    const safetyCheck = checkFlightSafety(weatherData, DEFAULT_SAFETY_RULES);

    return {
      metar,
      taf,
      ceiling_ft: weatherData.ceiling_ft ?? null,
      visibility_miles: weatherData.visibility_miles ?? null,
      wind_speed_kts: weatherData.wind_speed_kts ?? null,
      wind_gust_kts: weatherData.wind_gust_kts ?? null,
      temperature_c: weatherData.temperature_c ?? null,
      ...safetyCheck,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw new Error('Unable to fetch weather data');
  }
}

function parseWeather(metar: string): Partial<WeatherData> {
  const ceiling = extractCeiling(metar);
  const visibility = extractVisibility(metar);
  const wind = extractWind(metar);
  const temperature = extractTemperature(metar);

  return {
    ceiling_ft: ceiling,
    visibility_miles: visibility,
    wind_speed_kts: wind.speed,
    wind_gust_kts: wind.gust,
    temperature_c: temperature,
  };
}

function extractCeiling(metar: string): number | null {
  const ceilingMatch = metar.match(/BKN(\d{3})|OVC(\d{3})/);
  if (ceilingMatch) {
    const hundreds = parseInt(ceilingMatch[1] || ceilingMatch[2]);
    return hundreds * 100;
  }
  return null;
}

function extractVisibility(metar: string): number | null {
  const visMatch = metar.match(/\s(\d+)SM/);
  if (visMatch) {
    return parseInt(visMatch[1]);
  }
  const fractionMatch = metar.match(/\s(\d+)\/(\d+)SM/);
  if (fractionMatch) {
    return parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]);
  }
  return null;
}

function extractWind(metar: string): { speed: number | null; gust: number | null } {
  const windMatch = metar.match(/(\d{3})(\d{2,3})(?:G(\d{2,3}))?KT/);
  if (windMatch) {
    return {
      speed: parseInt(windMatch[2]),
      gust: windMatch[3] ? parseInt(windMatch[3]) : null,
    };
  }
  return { speed: null, gust: null };
}

function extractTemperature(metar: string): number | null {
  const tempMatch = metar.match(/\s(M?\d{2})\/(M?\d{2})\s/);
  if (tempMatch) {
    const temp = tempMatch[1];
    const isNegative = temp.startsWith('M');
    const value = parseInt(temp.replace('M', ''));
    return isNegative ? -value : value;
  }
  return null;
}

function checkFlightSafety(
  weather: Partial<WeatherData>,
  rules: SafetyRules
): { is_safe: boolean; blocked_reason: string | null } {
  const reasons: string[] = [];

  if (weather.ceiling_ft !== null && weather.ceiling_ft !== undefined && weather.ceiling_ft < rules.min_ceiling_ft) {
    reasons.push(`Ceiling too low: ${weather.ceiling_ft}ft (min ${rules.min_ceiling_ft}ft)`);
  }

  if (weather.visibility_miles !== null && weather.visibility_miles !== undefined && weather.visibility_miles < rules.min_visibility_miles) {
    reasons.push(`Visibility too low: ${weather.visibility_miles}mi (min ${rules.min_visibility_miles}mi)`);
  }

  const windSpeed = weather.wind_gust_kts || weather.wind_speed_kts;
  if (windSpeed !== null && windSpeed !== undefined && windSpeed > rules.max_wind_kts) {
    reasons.push(`Wind too high: ${windSpeed}kts (max ${rules.max_wind_kts}kts)`);
  }

  return {
    is_safe: reasons.length === 0,
    blocked_reason: reasons.length > 0 ? reasons.join('; ') : null,
  };
}

export async function checkRouteWeather(
  fromIcao: string,
  toIcao: string
): Promise<{ departure: WeatherData; arrival: WeatherData; safe: boolean }> {
  const [departure, arrival] = await Promise.all([
    getWeather(fromIcao),
    getWeather(toIcao),
  ]);

  return {
    departure,
    arrival,
    safe: departure.is_safe && arrival.is_safe,
  };
}
