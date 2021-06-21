import React from 'react'
import { Text } from 'react-native'

// Styles
import { styles } from './ToastStyles'

export interface IToastProps {
  message: string
}

const Toast: React.FC<IToastProps> = React.memo(({ message }) => {
  return <Text style={styles.container}>{message}</Text>
})

export default Toast
