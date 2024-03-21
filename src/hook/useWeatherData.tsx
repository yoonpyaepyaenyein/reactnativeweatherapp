import {useState, useEffect} from 'react';

interface WeatherData {
  timezone?: number;
}

export const useWeatherUtils = (
  weatherData: WeatherData | null,
  temperatureUnit: 'C' | 'F',
) => {
  const [sunsetTime, setSunsetTime] = useState<string>('');

  useEffect(() => {
    if (weatherData?.timezone) {
      const sunsetTimestamp: number = weatherData.timezone;
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      let hours = sunsetDate.getHours();
      const minutes = sunsetDate.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;

      const formattedSunsetTime = `${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes} ${amPm}`;
      setSunsetTime(formattedSunsetTime);
    }
  }, [weatherData]);

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'F') {
      return (temp * 9) / 5 + 32; // Celsius to Fahrenheit conversion
    }
    return temp; // Default to Celsius
  };

  return {sunsetTime, convertTemperature};
};
