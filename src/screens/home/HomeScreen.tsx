import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StatusBar} from 'react-native';
import {palette} from '../../utils/theme/color';

//Type
import WeatherData from '../../types/WeatherDataType';

//Component
import HomeComponent from '../../components/home/home';
import {useWeatherUtils} from '../../hook/useWeatherData';
import useWeatherFetcher from '../../hook/useWeatherFetcher';

const API_KEY = 'd9cb1365a067e8a4544f8011a448d17a';

const HomeScreen = () => {
  // const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState('Yangon');
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // const [loading, setLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const {loading, weatherData, refreshing, fetchWeather, setRefreshing} =
    useWeatherFetcher(city, API_KEY);

  const {sunsetTime, convertTemperature} = useWeatherUtils(
    weatherData,
    temperatureUnit,
  );

  useEffect(() => {
    fetchWeather();
  }, []);

  // const fetchWeather = () => {
  //   setLoading(true);
  //   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  //   fetch(apiUrl)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setWeatherData(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching weather:', error);
  //       setWeatherData(null);
  //     })
  //     .finally(() => {
  //       setRefreshing(false);
  //       setLoading(false);
  //     });
  // };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  const getCurrentLocationWeather = () => {
    setCity(data => (data !== 'Yangon' ? 'Yangon' : city));
    fetchWeather();
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(unit => (unit === 'C' ? 'F' : 'C'));
  };

  const handleInput = (text: string) => {
    setCity(text);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[palette.white]}
          progressBackgroundColor={palette.grey}
          tintColor={'green'}
        />
      }>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        animated={true}
        translucent={true}
      />
      <HomeComponent
        loading={loading}
        city={city}
        onChangeText={handleInput}
        searchAction={handleSearch}
        weatherData={weatherData}
        toggleTemperatureUnit={toggleTemperatureUnit}
        getCurrentLocationWeather={getCurrentLocationWeather}
        temperatureUnit={temperatureUnit}
        convertTemperatureAction={convertTemperature}
        time={sunsetTime}
      />
    </ScrollView>
  );
};

export default HomeScreen;
