import React, { PureComponent } from 'react';
import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Path, Text } from 'react-native-svg';

const Wrapper = styled.View`
  align-items: center;
`;

interface Props {
  value: number;
  width?: number;
  showValue?: boolean;
  valueSize?: number;
  floatNumbers?: number;
}

class Chart extends PureComponent<Props> {
  state = {
    chartWidth: Math.min(
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    ),
  };

  onLayout = () => {
    const chartWidth = Math.min(
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    );
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };
  getCoordinatesForPercent = (percent: number) => {
    if (percent === 1 && Platform.OS === 'android') {
      percent -= 0.00001;
    }
    const x = Math.cos(2 * Math.PI * percent) * 100;
    const y = Math.sin(2 * Math.PI * percent) * 100;
    return [x, y];
  };

  render() {
    const {
      value,
      width,
      showValue = false,
      valueSize = 3,
      floatNumbers = 1,
    } = this.props;
    const { chartWidth } = this.state;
    /**
     * source: https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936
     */
    return (
      <Wrapper onLayout={this.onLayout}>
        <Svg
          viewBox="0 0 36 36"
          width={width || chartWidth - 60}
          height={width || chartWidth - 60}
          style={{ flex: 1, aspectRatio: 1 }}>
          <Path
            transform="translate(36), scale(-1, 1)"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ECECEC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="100, 100"
          />
          <Path
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#5794CE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${Math.max(value - 2.5, 0.01)}, 100`}
          />
          {showValue && (
            <Text
              textAnchor="middle"
              fontSize={valueSize}
              x="18"
              y={36 / 2 + valueSize / 2 - 1}
              fill="#4a4a4a">
              {`${value.toFixed(floatNumbers).replace('.', ',')}%`}
            </Text>
          )}
        </Svg>
      </Wrapper>
    );
  }
}

export default Chart;
