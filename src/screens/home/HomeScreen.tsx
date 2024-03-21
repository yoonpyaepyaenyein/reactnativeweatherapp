import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StatusBar, Text} from 'react-native';
import {palette} from '../../utils/theme/color';
import Geolocation from '@react-native-community/geolocation';

//Component
import HomeComponent from '../../components/home/home';
import {useWeatherUtils} from '../../hook/useWeatherData';
import useWeatherFetcher from '../../hook/useWeatherFetcher';

const API_KEY = '82588d0971242caeabdb32549c34a52b';

const HomeScreen = () => {
  const [city, setCity] = useState('Yangon');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const {loading, weatherData, refreshing, fetchWeather, setRefreshing} =
    useWeatherFetcher(city, API_KEY);

  const {sunsetTime, convertTemperature} = useWeatherUtils(
    weatherData,
    temperatureUnit,
  );

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const getCurrentLocationWeather = () => {
    fetchWeather('Yangon');
    setCity('Yangon');
  };

  const handleSearch = useCallback(() => {
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  }, [city]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWeather(city);
  }, [refreshing]);

  const toggleTemperatureUnit = useCallback(() => {
    setTemperatureUnit(unit => (unit === 'C' ? 'F' : 'C'));
  }, [temperatureUnit]);

  const handleInput = useCallback(
    (text: string) => {
      setCity(text);
    },
    [city],
  );

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
