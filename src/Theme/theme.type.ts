import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type StyleType = TextStyle & ViewStyle & ImageStyle

export type ThemeColors = { [key: string]: string }
export type ThemeNavigationTheme = {
  dark: boolean
  colors: ThemeNavigationColors
}
export type ThemeNavigationColors = {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
}
export type ThemeFontSize = { [key: string]: number }
export type ThemeMetricsSizes = { [key: string]: number | string }

export type ThemeVariables = {
  Colors: ThemeColors
  NavigationColors: ThemeNavigationColors
  FontSize: ThemeFontSize
  MetricsSizes: ThemeMetricsSizes
}
