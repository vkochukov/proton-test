import { Colors } from '@/Theme/Variables'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preloader: {
    paddingVertical: 20,
  },
  text: {
    color: Colors.primary,
  },
})
