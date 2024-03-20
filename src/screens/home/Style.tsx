import {StyleSheet} from 'react-native';
import {palette} from '../../utils/theme/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: palette.black,
  //     // Center content vertically
  //   },
  //   inputC
  //   rowContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-around', // Use space-between to evenly distribute elements
  //     width: '100%',
  //     marginVertical: 10,
  //     paddingVertical: 10,
  //     alignItems: 'center', // Center items vertically
  //   },
  //   input: {
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     borderRadius: 5,
  //     width: '70%',
  //     // backgroundColor: 'red',
  //     height: 40,
  //     paddingLeft: 10,
  //   },
  //   searchButton: {
  //     backgroundColor: 'lightblue',
  //     borderRadius: 5,
  //     width: '20%',
  //     height: 38,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   defaultCityTitle: {
  //     color: palette.white,
  //     alignSelf: 'center',
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //   },
  //   cloudImage: {
  //     alignSelf: 'center',
  //     resizeMode: 'contain',
  //     overflow: 'hidden',
  //     width: 100,
  //     height: 100,
  //   },
  //   tempContext: {
  //     color: palette.white,
  //     fontWeight: 'bold',
  //     alignSelf: 'center',
  //     fontSize: 30,
  //   },
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
});

export default style;
