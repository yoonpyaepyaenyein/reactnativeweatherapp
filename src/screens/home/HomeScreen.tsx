import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import {palette} from '../../utils/theme/color';
import style from './Style';
import WeatherData from '../../types/WeatherDataType';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const API_KEY = 'd9cb1365a067e8a4544f8011a448d17a';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState('Yangon');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    setLoading(true);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

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
    setCity('Yangon');
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
      <View style={{flex: 1}}>
        <Image
          source={require('../../../assets/images/bg.png')}
          blurRadius={70}
          style={style.bgImage}
        />
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={palette.white} />
          </View>
        ) : (
          <View>
            <View style={{flexDirection: 'row'}}>
              {/* Search City Field */}
              <View style={style.inputContainer}>
                <TextInput
                  placeholder="Search City"
                  placeholderTextColor={'lightgray'}
                  style={style.input}
                  value={city == 'Yangon' ? '' : city}
                  onChangeText={text => setCity(text)}
                />
                <TouchableOpacity
                  style={style.iconButton}
                  activeOpacity={0.7}
                  onPress={handleSearch}>
                  <Text style={{color: palette.white}}>Search</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: wp(17)}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={getCurrentLocationWeather}>
                  <Image
                    source={require('../../../assets/icons/location.png')}
                    style={style.location}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Render weather data */}
            {weatherData && (
              <View>
                <View style={style.cityNameContainer}>
                  <Text style={style.cityTitle}>{weatherData.name}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Image
                    source={require('../../../assets/images/partlycloudy.png')}
                    style={{width: wp(45), height: wp(45), marginTop: hp(10)}}
                  />
                </View>

                <View>
                  <View style={{marginTop: hp(5)}}>
                    <Text style={style.temp}>
                      {weatherData.main.temp}&#176;
                    </Text>
                    <Text style={style.weatherContext}>
                      {weatherData.weather[0].main}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp(10),
                    }}>
                    <View style={style.otherStatsContainer}>
                      <Image
                        source={require('../../../assets/icons/wind.png')}
                        style={style.wind}
                      />
                      <Text style={style.otherStats}>
                        {weatherData.wind.speed}km
                      </Text>
                    </View>
                    <View style={style.otherStatsContainer}>
                      <Image
                        source={require('../../../assets/icons/drop.png')}
                        style={style.wind}
                      />
                      <Text style={style.otherStats}>
                        {weatherData.main.humidity}%
                      </Text>
                    </View>
                    <View style={style.otherStatsContainer}>
                      <Image
                        source={require('../../../assets/icons/sun.png')}
                        style={style.wind}
                      />
                      <Text style={style.otherStats}>{sunsetTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Placeholder when weather data is not available */}
            {!weatherData && (
              <View style={{alignItems: 'center'}}>
                <Text>No weather data available</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
