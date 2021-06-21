import React, { useMemo, useState } from 'react';
import { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import ChartContext, { useGenerateValues } from '../../helpers/ChartContext';

export default function ChartPathProvider({ data: providedData, children }) {
  const values = useGenerateValues();


  const dotStyle = useAnimatedStyle(() => {
    const closePrice = parseInt(values.originalY.value, 10)
    const openPrice = parseInt(providedData.firstCandleOpenPrice, 10)
    const deference = ((closePrice - openPrice) / openPrice) * 100 || 0;



    return {
      backgroundColor: deference < 0 ? 'rgb(245, 85, 95)' : 'rgb(100, 198, 114)',
      opacity: values.dotScale.value,
      transform: [
        { translateX: values.positionX.value },
        { translateY: values.positionY.value + 10 }, // TODO temporary fix for clipped chart
        { scale: values.dotScale.value },
      ],
    };
  }, []);



  const highlightStyle = useAnimatedStyle(
    () => ({
      opacity: values.dotScale.value,
      transform: [
        { translateX: values.positionX.value },
        { translateY: 50 }, // TODO temporary fix for clipped chart
        { scale: values.dotScale.value },
      ],
    }),
    []
  );

  const [contextReanimatedValue, setContextValue] = useState({});
  const contextValue = useMemo(
    () => ({
      dotStyle,
      highlightStyle,
      ...values,
      ...contextReanimatedValue,
      providedData,
      setContextValue,
    }),
    [dotStyle, highlightStyle, values, contextReanimatedValue, providedData]
  );

  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
}
