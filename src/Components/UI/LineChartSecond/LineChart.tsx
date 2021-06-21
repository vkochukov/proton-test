import React from 'react'
import { processColor } from 'react-native'
import {
  ChartSelectEvent,
  LineChart as LineChartComponent,
  LineValue,
} from 'react-native-charts-wrapper'
import { Colors } from '@/Theme/Variables'

// Styles
import { styles } from './LineChartStyles'

export interface ILineChartProps {
  values: LineValue[]
  onSelect(event: ChartSelectEvent): void
}

const LineChart: React.FC<ILineChartProps> = React.memo(
  ({ values, onSelect }) => {
    const markerConfig = {
      enabled: true,
      // markerColor: processColor(Colors.transparent),
      textColor: processColor(Colors.grey),
      textSize: 12,
    }

    const dataConfig = {
      dataSets: [
        {
          values,
          label: '',
          config: {
            mode: 'LINEAR',
            drawValues: false,
            lineWidth: 1,
            drawCircles: false,
            drawCircleHole: true,
            circleRadius: 5,
            highlightColor: processColor(Colors.lightGrey),
            drawHorizontalHighlightIndicator: false,
            highlightLineWidth: 1,
            color: processColor(Colors.primary),
            drawFilled: false,
            valueTextSize: 15,
          },
        },
      ],
    }

    return (
      <LineChartComponent
        style={styles.container}
        marker={markerConfig}
        // extraOffsets={{ left: -10 }}
        borderColor={processColor('red')}
        drawGridBackground={false}
        drawBorders={false}
        chartDescription={{ text: '' }}
        legend={{ enabled: false }}
        data={dataConfig}
        maxVisibleValueCount={16}
        dragDecelerationFrictionCoef={0.3}
        // maxHighlightDistance={20}
        // chartLongPress={}
        doubleTapToZoomEnabled={false}
        // highlightPerDragEnabled={false}
        dragDecelerationEnabled={true}
        // dragDecelerationFrictionCoef={0.99}
        // scaleEnabled={false}
        onSelect={onSelect}
        xAxis={{
          enabled: false,
        }}
        yAxis={{
          left: {
            enabled: false,
          },
          right: {
            enabled: false,
          },
        }}
      />
    )
  },
)

export default LineChart
