import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MainContainer, StartupContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { SafeAreaView } from 'react-native'
import { startupLoadingSelector } from '@/Selectors'

const Stack = createStackNavigator()

export enum EScreens {
  'Startup' = 'Startup',
  'Main' = 'Main',
}

// @refresh reset
const ApplicationNavigator = React.memo(() => {
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector(startupLoadingSelector)

  useEffect(() => {
    if (!applicationIsLoading) {
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
    },
    [],
  )

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name={EScreens.Startup} component={StartupContainer} />
          {isApplicationLoaded && (
            <Stack.Screen
              name={EScreens.Main}
              component={MainContainer}
              options={{
                animationEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
})

export default ApplicationNavigator
