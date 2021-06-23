import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme/Variables'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: Colors.whiteSmoke,
  },
  buttonText: {
    color: Colors.label,
  },
  boldText: {
    fontWeight: 'bold',
  },
  preloader: {
    paddingVertical: 20,
  },
  symbol: {
    paddingTop: 30,
    color: Colors.text,
    fontWeight: 'bold',
    backgroundColor: Colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
  priceWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 50,
  },
  buttonWrapper: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  filled: {
    backgroundColor: Colors.labelContainer,
  },
  buttonListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
