import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
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
    const { originalY } = useContext(ChartContext);
    const decimal = useDerivedValue(() => {
      const decimalRegex = /\d+(\.\d{1,2})?/i
      const found = originalY.value.toString().match(decimalRegex)

      if (found) {
        return found[1]
      }

    }, []);
    const decimalProps = useAnimatedStyle(() => {
      return {
        color: 'grey',
        text: decimal.value,
        marginLeft: -7,
        letterSpacing: 1,
        includeFontPadding: false,
      };
    }, []);

    return (
      <AnimatedTextInput
        {...props}
        style={styles.fontSize}
        animatedProps={decimalProps}
        defaultValue={decimal}
        editable={false}
      />
    );
  };
}

function PriceLabelFactory() {
  return function ChartLabel({ format, ...props }) {
    const { originalY } = useContext(ChartContext);
    const price = useDerivedValue(() => {
      return originalY.value ? `$${originalY.value.split(".")[0]}` : '';
    }, []);
    const priceProps = useAnimatedStyle(() => {
      return {
        color: 'black',
        letterSpacing: 1,
        includeFontPadding: false,
        text: price.value,
      };
    }, []);

    return (
      <AnimatedTextInput
        {...props}
        style={styles.fontSize}
        animatedProps={priceProps}
        defaultValue={price}
        editable={false}
      />
    );
  };
}

function ChartPriceLabelFactory(style) {
  return function ChartLabel() {
    const PriceLabel = PriceLabelFactory();
    const DecimalLabel = DecimalLabelFactory();

    const { [style]: val = 0, providedData } = useContext(ChartContext);
    const { firstCandleOpenPrice } = providedData;


    const percentage = useDerivedValue(() => {
      if (val.value && firstCandleOpenPrice) {
        const closePrice = parseInt(val.value, 10)
        const openPrice = parseInt(firstCandleOpenPrice, 10)
        const deference = ((closePrice - openPrice) / openPrice) * 100;

        return `${deference > 0 ? '+' : ''}${deference.toFixed(2).toString()}%`;
      }
    }, []);

    const percentageProps = useAnimatedStyle(() => {
      const closePrice = parseInt(val.value, 10)
      const openPrice = parseInt(firstCandleOpenPrice, 10)
      const deference = ((closePrice - openPrice) / openPrice) * 100;

      return {
        marginLeft: -5,
        color: deference > 0 ? 'rgb(100, 198, 114)' : 'rgb(245, 85, 95)',
        text: percentage.value,
      };
    }, []);

    return (
      <>
        <View style={styles.container}>
          <View style={styles.priceWrapper}>
            <PriceLabel />
            <DecimalLabel />
          </View>
          <AnimatedTextInput
            style={styles.percentage}
            animatedProps={percentageProps}
            defaultValue={percentage}
            editable={false}
          />
        </View>
      </>
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
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  fontSize: {
    fontSize: 30,
  }
});

export const ChartPriceLabel = ChartPriceLabelFactory('originalY');
export const ChartYLabel = ChartLabelFactory('originalY');
export const ChartXLabel = ChartLabelFactory('originalX');
export const ChartMarkerLabel = ChartLabelFactory('originalMarker');
