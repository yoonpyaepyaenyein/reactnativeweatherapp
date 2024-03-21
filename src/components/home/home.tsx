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
  StyleSheet,
} from 'react-native';
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
      delay: 500, // Delaying the title animation slightly
      useNativeDriver: true,
    }).start();

    Animated.timing(locationAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      delay: 1000, // Delaying the location animation slightly more
      useNativeDriver: true,
    }).start();
    // Animate entry
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Animate weather data container
    if (weatherData) {
      Animated.timing(weatherDataAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    // Animate placeholder
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
              {/* Search City Field */}
              <Animated.View
                style={[style.inputContainer, {opacity: locationAnim}]}>
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
              </Animated.View>

              <Animated.View style={{marginTop: wp(17), opacity: fadeInAnim}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={getCurrentLocationWeather}>
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
                  <Text style={style.cityTitle}>{weatherData.name} | </Text>
                  <TouchableOpacity onPress={toggleTemperatureUnit}>
                    <Text style={style.celFahTitle}>
                      {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Your weather data rendering code */}
                <Animated.View style={{opacity: weatherDataAnim}}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                      source={require('../../../assets/images/partlycloudy.png')}
                      style={{width: wp(45), height: wp(45), marginTop: hp(10)}}
                    />
                  </View>
                </Animated.View>

                <Animated.View style={{opacity: weatherDataAnim}}>
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
                </Animated.View>
              </Animated.View>
            )}

            {!weatherData && !loading && (
              <Animated.View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: placeholderAnim,
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

const style = StyleSheet.create({
  bgImage: {flex: 1, width: '100%', height: '100%', position: 'absolute'},
  inputContainer: {
    backgroundColor: palette.bgWhite(0.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(15),
    marginHorizontal: wp(3),
    borderRadius: wp(10),
    height: wp(12),
    paddingLeft: wp(3),
    width: '80%',
  },
  input: {color: palette.white, paddingLeft: wp(2), borderRadius: wp(10)},
  iconButton: {
    backgroundColor: palette.bgWhite(0.3),
    padding: wp(2),
    marginRight: wp(2),
    borderRadius: wp(5),
  },
  cityTitle: {
    color: palette.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
  },
  temp: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white,
    fontSize: wp(10),
  },
  weatherContext: {
    textAlign: 'center',
    color: palette.white,
    fontSize: wp(5),
    marginTop: wp(2),
  },
  wind: {
    width: wp(5),
    height: wp(5),
  },
  location: {
    width: wp(10),
    height: wp(10),
    marginBottom: wp(1),
  },
  otherStats: {
    color: palette.white,
    fontSize: wp(3.5),
    paddingLeft: wp(2),
  },
  otherStatsContainer: {
    marginHorizontal: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(6),
  },
  cityNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(10),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitContainer: {
    marginTop: hp(5),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  celFahTitle: {
    fontWeight: '600',
    fontSize: wp(6),
    color: palette.primary,
  },
  noData: {
    fontWeight: '400',
    fontSize: wp(5),
    letterSpacing: 2,
  },
});

export default memo(Home);
