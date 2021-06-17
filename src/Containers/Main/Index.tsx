import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, TextInput } from 'react-native'
import { KlinesState } from '@/Store/Klines'
import {
  klinesErrorSelector,
  klinesListSelector,
  klinesLoadingSelector,
} from '@/Selectors'
import FetchList from '@/Store/Klines/FetchList'

const MainContainer = () => {
  const dispatch = useDispatch()

  const klinesList = useSelector(klinesListSelector)
  const fetchKlinesLoading = useSelector(klinesLoadingSelector)
  const fetchKlinesError = useSelector(klinesErrorSelector)

  // const fetchKlines = () => {
  //   dispatch(FetchList.action({ symbol: 'BTCUSDT', interval: '1d' }))
  // }

  return (
    <View style={{ backgroundColor: 'red', width: '100%', height: 200 }}>
      <View style={{ backgroundColor: 'red', width: '100%', height: 200 }}>
        {fetchKlinesLoading && <ActivityIndicator />}
        {fetchKlinesError ? (
          <Text>{fetchKlinesError.message}</Text>
        ) : (
          <Text>{klinesList.length}</Text>
        )}
      </View>
      <View>
        <Text>id</Text>
      </View>
    </View>
  )
}

export default MainContainer
