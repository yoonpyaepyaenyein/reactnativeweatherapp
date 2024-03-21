import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StatusBar} from 'react-native';
import {palette} from '../../utils/theme/color';

//Component
import HomeComponent from '../../components/home/home';
import {useWeatherUtils} from '../../hook/useWeatherData';
import useWeatherFetcher from '../../hook/useWeatherFetcher';

const API_KEY = 'd9cb1365a067e8a4544f8011a448d17a';

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
    fetchWeather();
  }, []);

  const handleSearch = useCallback(() => {
    if (city.trim() !== '') {
      fetchWeather();
    }
  }, [city]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWeather();
  }, [refreshing]);

  const getCurrentLocationWeather = () => {
    setCity(data => (data !== 'Yangon' ? 'Yangon' : city));
    fetchWeather();
  };

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
