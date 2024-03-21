import {useState} from 'react';
import WeatherData from '../types/WeatherDataType';

const useWeatherFetcher = (city: string, API_KEY: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchWeather = (city: string) => {
    setLoading(true);
    setRefreshing(true);

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.cod && data.cod === '404') {
          setWeatherData(null); // City not found, set weatherData to null
        } else {
          setWeatherData(data);
        }
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  return {loading, weatherData, refreshing, fetchWeather, setRefreshing};
};

export default useWeatherFetcher;

// const useWeatherFetcher = (city: string, API_KEY: string) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false);

//   const fetchWeather = () => {
//     setLoading(true);
//     setRefreshing(true);

//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//     fetch(apiUrl, {
//       method: 'GET',
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         setWeatherData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching weather:', error);
//         setWeatherData(null);
//       })
//       .finally(() => {
//         setLoading(false);
//         setRefreshing(false);
//       });
//   };

//   return { loading, weatherData, refreshing, fetchWeather };
// };

// export default useWeatherFetcher;
