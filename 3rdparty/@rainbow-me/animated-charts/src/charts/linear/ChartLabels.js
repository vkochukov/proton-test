import React, { useContext } from 'react';
import { TextInput, StyleSheet, View, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import ChartContext from '../../helpers/ChartContext';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ChartLabelFactory(style) {
  return function ChartLabel({ format, ...props }) {
    const { [style]: val = 0 } = useContext(ChartContext);
    const formattedValue = useDerivedValue(() => {
      return format ? format(val.value) : val.value;
    }, []);
    const textProps = useAnimatedStyle(() => {
      return {
        text: formattedValue.value,
      };
    }, []);

    return (
      <AnimatedTextInput
        {...props}
        animatedProps={textProps}
        defaultValue={format ? format(val.value) : val.value}
        editable={false}
      />
    );
  };
}

function DecimalLabelFactory() {
  return function ChartLabel({ format, ...props }) {
    const { originalY, providedData: { points } } = useContext(ChartContext);
    const lastCandle = points[points.length - 1];

    const decimal = useDerivedValue(() => {
      const decimalRegex = /\d+(\.\d{1,2})?/i
      const price = originalY.value || lastCandle.y
      const found = price.toString().match(decimalRegex)

      if (found) {
        return found[1]
      }

    }, [originalY, lastCandle]);

    const decimalProps = useAnimatedStyle(() => ({
      color: 'grey',
      text: decimal.value,
      marginLeft: Platform.OS === 'ios' ? -3 : -7,
      letterSpacing: 1,
      includeFontPadding: false,
    }), [decimal]);

    return (
      <AnimatedTextInput
        {...props}
        style={styles.fontSize}
        animatedProps={decimalProps}
        defaultValue={decimal.value}
        editable={false}
      />
    );
  };
}

function PriceLabelFactory() {
  return function ChartLabel({ format, ...props }) {
    const { originalY, providedData: { points } } = useContext(ChartContext);
    const lastCandle = points[points.length - 1];
    const lastCandlePrice = parseInt(lastCandle.y, 10)
    const price = useDerivedValue(() => `$${parseInt(originalY.value, 10) || lastCandlePrice}`, [
      originalY,
      lastCandlePrice,
    ]);

    const priceProps = useAnimatedStyle(() => ({
      color: 'black',
      letterSpacing: 1,
      includeFontPadding: false,
      text: price.value,
    }), [price]);

    return (
      <AnimatedTextInput
        {...props}
        style={styles.fontSize}
        animatedProps={priceProps}
        defaultValue={price.value}
        editable={false}
      />
    );
  };
}

function PercentageLabelFactory() {
  return function ChartLabel() {
    const { originalY, providedData: { firstCandleOpenPrice, points } } = useContext(ChartContext);
    const lastCandle = points[points.length - 1];
    const lastCandlePrice = parseInt(lastCandle.y, 10)

    const deference = useDerivedValue(
      () => {
        const price = originalY.value || lastCandlePrice

        return ((price - firstCandleOpenPrice) / firstCandleOpenPrice) * 100
      },
      [originalY, firstCandleOpenPrice, lastCandlePrice],
    );

    const percentage = useDerivedValue(
      () => `${deference.value > 0 ? '+' : ''}${deference.value.toFixed(2).toString()}%`,
      [deference],
    );

    const percentageProps = useAnimatedStyle(() => ({
      color: deference.value > 0 ? 'rgb(100, 198, 114)' : 'rgb(245, 85, 95)',
      text: percentage.value,
    }), [deference]);

    return <AnimatedTextInput
      style={styles.percentage}
      animatedProps={percentageProps}
      defaultValue={percentage.value}
      editable={false}
    />
  };
}

function ChartPriceLabelFactory() {
  return function ChartLabel() {
    const PriceLabel = PriceLabelFactory();
    const DecimalLabel = DecimalLabelFactory();
    const PercentageLabel = PercentageLabelFactory();

    return (
      <View style={styles.container}>
        <PriceLabel />
        <DecimalLabel />
        <PercentageLabel />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  percentage: {
    fontSize: 15,
  },
  fontSize: {
    fontSize: 30,
  }
});

export const ChartPriceLabel = ChartPriceLabelFactory();
export const ChartYLabel = ChartLabelFactory('originalY');
export const ChartXLabel = ChartLabelFactory('originalX');
export const ChartMarkerLabel = ChartLabelFactory('originalMarker');
