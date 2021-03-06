import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartPriceLabel,
} from '@rainbow-me/animated-charts'
import { Colors, windowWidth } from '@/Theme/Variables'
import { IPreparedKlines } from '@/Types/PreparedKlines'
import { IKlinesItem } from '@/Types/KlinesItem'

// Styles
import { styles } from './LineChartStyles'

interface ILineChartProps {
  data: IPreparedKlines[]
  firstCandle: IKlinesItem
}

const LineChart: React.FC<ILineChartProps> = React.memo(
  ({ data, firstCandle }) => (
    <LinearGradient colors={[Colors.white, Colors.whiteSmoke]}>
      <ChartPathProvider
        data={{
          points: data,
          smoothingStrategy: 'bezier',
          firstCandleOpenPrice: firstCandle.open,
        }}
      >
        <View style={styles.chartWrapper}>
          <ChartPriceLabel style={styles.chart} />
        </View>
        <ChartPath height={windowWidth / 2} width={windowWidth} />
        <ChartDot style={styles.chartDot} />
      </ChartPathProvider>
    </LinearGradient>
  ),
)

export default LineChart
