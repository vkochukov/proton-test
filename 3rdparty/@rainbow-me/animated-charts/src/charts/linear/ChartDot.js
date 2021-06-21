import React, { useContext } from 'react';
import Animated from 'react-native-reanimated';
import { ChartMarkerLabel } from './ChartLabels';
import ChartContext from '../../helpers/ChartContext';
import withReanimatedFallback from '../../helpers/withReanimatedFallback';

function ChartDot({ style, size = 10, ...props }) {
  const { dotStyle, highlightStyle } = useContext(ChartContext);

  return (
    <>
      <Animated.View
        {...props}
        pointerEvents="none"
        style={[
          highlightStyle,
          {
            width: 1,
            height: '65%',
            borderWidth: 0.6,
            borderRadius: 1,
            borderColor: '#BFBFBF',
            borderStyle: 'dashed',
            top: '15%',
            position: 'absolute',
          },
        ]}
      >
        <ChartMarkerLabel
          // format={formatDateTime}
          style={{
            top: -size * 3,
            left: -size * 2,
            position: 'absolute',
            color: 'grey',
          }}
        />
      </Animated.View>
      <Animated.View
        {...props}
        pointerEvents="none"
        style={[
          dotStyle,
          {
            borderRadius: size / 2,
            height: size,
            left: -size / 2,
            position: 'absolute',
            top: -size / 2 + 100,
            width: size,
          },
          style,
        ]}
      />
    </>
  );
}

export default withReanimatedFallback(ChartDot);
