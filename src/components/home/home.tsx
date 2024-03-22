import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {palette} from '../../utils/theme/color';
import WeatherData from '../../types/WeatherDataType';
import style from '../../screens/home/Style';

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
  const [fadeInAnim] = useState(new Animated.Value(0));
  const [weatherDataAnim] = useState(new Animated.Value(0));
  const [placeholderAnim] = useState(new Animated.Value(0));
  const [titleAnim] = useState(new Animated.Value(0));
  const [locationAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(locationAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    if (weatherData) {
      Animated.timing(weatherDataAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    if (!loading && !weatherData) {
      Animated.timing(placeholderAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, weatherData]);

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../../assets/images/bg.png')}
        blurRadius={70}
        style={style.bgImage}
      />
      <Animated.View style={{flex: 1, opacity: fadeInAnim}}>
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={palette.white} />
          </View>
        ) : (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Animated.View
                style={[style.inputContainer, {opacity: locationAnim}]}>
                <TextInput
                  placeholder="Search City ....."
                  placeholderTextColor={'lightgray'}
                  style={style.input}
                  value={city === 'Yangon' ? '' : city}
                  onChangeText={onChangeText}
                />
                <TouchableOpacity
                  style={style.iconButton}
                  activeOpacity={0.7}
                  onPress={searchAction}>
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={style.searchIcon}
                  />
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={{opacity: fadeInAnim}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={getCurrentLocationWeather}
                  style={style.locationContainer}>
                  <Image
                    source={require('../../../assets/icons/location.png')}
                    style={style.location}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>

            {weatherData && (
              <Animated.View style={{opacity: weatherDataAnim}}>
                <View style={style.cityNameContainer}>
                  <Text style={style.cityTitle}>
                    {weatherData.name} ,{' '}
                    {weatherData.sys.country === 'MM'
                      ? 'Myanmar'
                      : weatherData.sys.country}{' '}
                  </Text>
                </View>

                <Animated.View style={{opacity: weatherDataAnim}}>
                  <View style={style.searchRowContainer}>
                    <Image
                      source={require('../../../assets/images/partlycloudy.png')}
                      style={style.image}
                    />
                  </View>
                </Animated.View>

                <Animated.View style={{opacity: weatherDataAnim}}>
                  <View>
                    <View style={style.unitContainer}>
                      <TouchableOpacity
                        onPress={toggleTemperatureUnit}
                        activeOpacity={0.7}
                        style={{flexDirection: 'row'}}>
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
                      </TouchableOpacity>
                      <Text style={style.weatherContext}>
                        {weatherData !== null ?? weatherData?.weather[0]?.main}
                      </Text>
                    </View>

                    <View style={style.bottomContainer}>
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
                    </View>
                  </View>
                </Animated.View>
              </Animated.View>
            )}

            {!weatherData && !loading && (
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: placeholderAnim,
                  height: '80%',
                }}>
                <Text style={style.noData}>City Not Found !!</Text>
              </Animated.View>
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default memo(Home);
