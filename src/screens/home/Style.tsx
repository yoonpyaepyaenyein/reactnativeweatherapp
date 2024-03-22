import {StyleSheet, Platform, Dimensions} from 'react-native';
import {palette} from '../../utils/theme/color';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  bgImage: {flex: 1, width: '100%', height: '100%', position: 'absolute'},
  inputContainer: {
    backgroundColor: palette.bgWhite(0.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.08,
    marginHorizontal: width * 0.03,
    borderRadius: width * 0.1,
    height: width * 0.12,
    paddingLeft: width * 0.03,
    width: '80%',
  },
  locationContainer: {
    marginTop: height * 0.087,
  },
  image: {
    width: width * 0.45,
    height: width * 0.45,
    marginTop: height * 0.1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.1,
    width: width * 0.8,
    alignSelf: 'center',
  },
  input: {
    color: palette.white,
    paddingLeft: width * 0.02,
    borderRadius: width * 0.1,
    width: '75%',
  },
  iconButton: {
    backgroundColor: palette.bgWhite(0.3),
    padding: width * 0.02,
    marginRight: width * 0.02,
    borderRadius: width * 0.05,
    width: '15%',
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
    fontSize: width * 0.1,
  },
  weatherContext: {
    textAlign: 'center',
    color: palette.white,
    fontSize: width * 0.05,
    marginTop: width * 0.02,
  },
  wind: {
    width: width * 0.05,
    height: width * 0.05,
  },
  location: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: width * 0.01,
  },
  otherStats: {
    color: palette.white,
    fontSize: width * 0.035,
    paddingLeft: width * 0.02,
  },
  otherStatsContainer: {
    marginHorizontal: height * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  cityNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: height * 0.1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitContainer: {
    marginTop: height * 0.05,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  celFahTitle: {
    fontWeight: '600',
    fontSize: width * 0.1,
    color: palette.white,
    alignSelf: 'center',
  },
  noData: {
    fontWeight: '400',
    fontSize: width * 0.05,
    letterSpacing: 2,
  },
  searchIcon: {
    width: width * 0.055,
    height: width * 0.055,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  searchRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default style;
