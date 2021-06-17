import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'

const StartupContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={{ width: '100%', height: 200, backgroundColor: 'red' }}>
      <ActivityIndicator />
      <Text>123213</Text>
      <Text>welcome</Text>
    </View>
  )
}

export default StartupContainer
