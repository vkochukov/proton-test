import React from 'react'
import { View } from 'react-native'
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartPriceLabel,
} from '@rainbow-me/animated-charts'
import { IPreparedKlines } from '@/Containers/Main/utils/prepareKlinesList'
import { IKlinesItem } from '@/Store/Klines/FetchList'
import { windowWidth } from '@/Theme/Variables'

// Styles
import { styles } from './LineChartStyles'

export interface ILineChartProps {
  data: IPreparedKlines[]
  firstCandle: IKlinesItem
}

const LineChart: React.FC<ILineChartProps> = React.memo(
  ({ data, firstCandle }) => {
    const firstCandleOpenPrice = firstCandle.open

    return (
      <View>
        <ChartPathProvider
          data={{
            points: data,
            smoothingStrategy: 'bezier',
            firstCandleOpenPrice,
          }}
        >
          <View style={styles.chartWrapper}>
            <ChartPriceLabel style={styles.chart} />
          </View>
          <ChartPath height={windowWidth / 2} width={windowWidth} />
          <ChartDot style={styles.chartDot} />
        </ChartPathProvider>
      </View>
    )
  },
)

export default LineChart
