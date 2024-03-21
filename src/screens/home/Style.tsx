import {StyleSheet} from 'react-native';
import {palette} from '../../utils/theme/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  input: {
    color: palette.white,
    paddingLeft: wp(2),
    borderRadius: wp(10),
    // backgroundColor: 'red',
    width: '75%',
  },
  iconButton: {
    backgroundColor: palette.bgWhite(0.3),
    padding: wp(2),
    marginRight: wp(2),
    borderRadius: wp(5),
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
    fontSize: wp(10),
  },
  weatherContext: {
    // fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white,
    fontSize: wp(5),
    marginTop: wp(2),
  },
  wind: {
    width: wp(5),
    height: wp(5),
    // marginTop: hp(2),
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
    // backgroundColor: 'red',
    marginTop: hp(6),
  },
  cityNameContainer: {
    // flex: 1,
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
    fontSize: wp(10),
    color: palette.white,
    alignSelf: 'center',
  },
  noData: {
    fontWeight: '400',
    fontSize: wp(5),
    letterSpacing: 2,
    // alignSelf: 'center',
  },
  searchIcon: {
    width: wp(5.5),
    height: wp(5.5),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  searchRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default style;
