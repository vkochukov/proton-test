import React, { useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import {
  klinesErrorSelector,
  klinesListSelector,
  klinesLoadingSelector,
} from '@/Selectors'
import prepareKlinesList from '@/Containers/Main/utils/prepareKlinesList'
import { LineChart, Toast } from '@/Components/UI'
import FetchList from '@/Store/Klines/FetchList'
import { Colors } from '@/Theme/Variables'
import { ESymbols } from '@/Types/Symbols'
import { EKlinesIntervals } from '@/Types/KlinesIntervals'

// Styles
import { styles } from './MainStyles'

const klinesIntervalsList = [
  {
    key: EKlinesIntervals.minutes,
  },
  {
    key: EKlinesIntervals.hour,
  },
  {
    key: EKlinesIntervals.hours,
  },
  {
    key: EKlinesIntervals.day,
  },
]

const MainContainer: React.FC = React.memo(() => {
  const dispatch = useDispatch()

  const klinesList = useSelector(klinesListSelector)
  const fetchKlinesLoading = useSelector(klinesLoadingSelector)
  const fetchKlinesError = useSelector(klinesErrorSelector)

  const [activeInterval, setActiveInterval] = useState(EKlinesIntervals.minutes)

  const fetchKlines = useCallback(
    (interval: EKlinesIntervals) => {
      dispatch(FetchList.action({ symbol: ESymbols.BTCUSDT, interval }))
    },
    [dispatch],
  )

  const buttonList = useMemo(() => {
    return klinesIntervalsList.map(({ key }) => {
      const isActive = key === activeInterval
      const handlePress = () => {
        fetchKlines(key)
        setActiveInterval(key)
      }

      return (
        <TouchableOpacity
          style={[styles.buttonWrapper, isActive && styles.filled]}
          onPress={handlePress}
          disabled={isActive}
        >
          <Text style={[styles.buttonText, isActive && styles.boldText]}>
            {key}
          </Text>
        </TouchableOpacity>
      )
    })
  }, [activeInterval, fetchKlines])

  return (
    <View style={styles.container}>
      {fetchKlinesError && <Toast message={fetchKlinesError.message} />}
      <Text style={[styles.symbol]}>{ESymbols.BTCUSDT}</Text>
      <LineChart
        firstCandle={klinesList[0]}
        data={prepareKlinesList(klinesList, activeInterval)}
      />
      <View style={styles.buttonListContainer}>{buttonList}</View>
      {fetchKlinesLoading && (
        <ActivityIndicator
          style={styles.preloader}
          size="large"
          color={Colors.primary}
        />
      )}
    </View>
  )
})

export default MainContainer
