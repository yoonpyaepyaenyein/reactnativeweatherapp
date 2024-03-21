import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import style from '../../screens/home/Style';
import {palette} from '../../utils/theme/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WeatherData from '../../types/WeatherDataType';

const Home = ({
  loading,
  city,
  onChangeText,
  searchAction,
  weatherData,
  toggleTemperatureUnit,
  getCurrentLocationWeather,
  temperatureUnit,
  convertTemperatureAction,
  time,
}: {
  loading: boolean;
  city: string;
  onChangeText: (text: string) => void;
  searchAction: () => void;
  weatherData: WeatherData | null;
  toggleTemperatureUnit: () => void;
  getCurrentLocationWeather: () => void;
  temperatureUnit: 'C' | 'F';
  convertTemperatureAction: any;
  time: string;
}) => {
  return (
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
                onChangeText={onChangeText}
              />
              <TouchableOpacity
                style={style.iconButton}
                activeOpacity={0.7}
                onPress={searchAction}>
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
                <Text style={style.cityTitle}>{weatherData.name} | </Text>
                <TouchableOpacity onPress={toggleTemperatureUnit}>
                  <Text style={style.celFahTitle}>
                    {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  source={require('../../../assets/images/partlycloudy.png')}
                  style={{width: wp(45), height: wp(45), marginTop: hp(10)}}
                />
              </View>

              <View>
                <View style={style.unitContainer}>
                  <Text style={style.temp}>
                    {temperatureUnit === 'C'
                      ? `${weatherData?.main?.temp}\u00B0`
                      : `${convertTemperatureAction(
                          weatherData?.main?.temp,
                        )}\u00B0`}
                  </Text>
                  <Text style={style.celFahTitle}>
                    {temperatureUnit == 'C' ? ' C ' : ' F '}
                  </Text>
                  <Text style={style.weatherContext}>
                    {weatherData !== null ?? weatherData?.weather[0]?.main}
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
                      {weatherData?.wind?.speed}km
                    </Text>
                  </View>
                  <View style={style.otherStatsContainer}>
                    <Image
                      source={require('../../../assets/icons/drop.png')}
                      style={style.wind}
                    />
                    <Text style={style.otherStats}>
                      {weatherData?.main?.humidity}%
                    </Text>
                  </View>
                  <View style={style.otherStatsContainer}>
                    <Image
                      source={require('../../../assets/icons/sun.png')}
                      style={style.wind}
                    />
                    <Text style={style.otherStats}>{time}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Placeholder when weather data is not available */}
          {!weatherData && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                height: '80%',
              }}>
              <Text style={style.noData}>City Not Found !! </Text>
              {/* <Text style={style.noData}>Please Try Again </Text> */}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default memo(Home);
