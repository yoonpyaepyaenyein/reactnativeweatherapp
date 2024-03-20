import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl, ScrollView} from 'react-native';
// import {PALETTE} from '../../utils/theme/color';

const API_KEY = 'd9cb1365a067e8a4544f8011a448d17a';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=16.8661&lon=96.1951&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching weather:', error))
      .finally(() => {
        // setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['red']}
          progressBackgroundColor={'red'}
          tintColor={'green'}
        />
      }></ScrollView>
  );
};

export default HomeScreen;
