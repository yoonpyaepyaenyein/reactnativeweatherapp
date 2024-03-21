import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const {loading, weatherData, refreshing, fetchWeather, setRefreshing} =
    useWeatherFetcher(city, API_KEY);

  const {sunsetTime, convertTemperature} = useWeatherUtils(
    weatherData,
    temperatureUnit,
  );

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (position: any) => {
  //       const {latitude, longitude} = position.coords;
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     },
  //     (error: any) => {
  //       console.log(error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, []);

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
      {/* <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text> */}
    </ScrollView>
  );
};

export default HomeScreen;
