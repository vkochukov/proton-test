/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  ThemeColors,
  ThemeFontSize,
  ThemeMetricsSizes,
  ThemeNavigationColors,
} from '@/Theme/theme.type'
import { Dimensions } from 'react-native'

/**
 * Colors
 */
export const Colors: ThemeColors = {
  transparent: 'rgba(0,0,0,0)',
  white: 'rgba(255,255,255, 1)',
  whiteSmoke: 'rgba(250,250,250, 1)',
  text: '#14141D',
  grey: '#8D8D92',
  lightGrey: '#E1E2E3',
  primary: '#63C672',
  secondary: '#FF4444',
  label: '#7B97ED',
  labelContainer: '#DDE4F9',
}

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30

export const windowWidth = Dimensions.get('window').width

export const MetricsSizes: ThemeMetricsSizes = {
  tiny,
  small,
  regular,
  large,
}
