import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'
import { Colors } from '@/Theme/Variables'

// Styles
import { styles } from './StartupStyles'

const StartupContainer: React.FC = React.memo(() => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.preloader}
        size="large"
        color={Colors.primary}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
})

export default StartupContainer
