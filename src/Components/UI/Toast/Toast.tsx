import React from 'react'
import { Text } from 'react-native'

// Styles
import { styles } from './ToastStyles'

interface IToastProps {
  message: string
}

const Toast: React.FC<IToastProps> = React.memo(({ message }) => (
  <Text style={styles.container}>{message}</Text>
))

export default Toast
