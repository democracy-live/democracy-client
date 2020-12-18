import { scaleLinear, scaleOrdinal, sum } from 'd3';
import React, { useContext } from 'react';
import { G, Rect, Text } from 'react-native-svg';
import { ThemeContext } from 'styled-components';

export interface BarData {
  matches: number;
  differences: number;
}

interface Props {
  data: BarData;
  width: number;
  height: number;
  y?: number;
  active: boolean;
}

export const FractionBar: React.FC<Props> = ({
  data: { matches, differences },
  width,
  height,
  y,
  active,
}) => {
  const themeContext = useContext(ThemeContext);
  const total = sum([matches, differences]);
  const xScale = scaleLinear().domain([0, total]).range([0, width]);

  const votedColors = themeContext.colors.womCharts;

  const deviantColorRange = scaleOrdinal<string>()
    .domain(['matches', 'differences'])
    .range([votedColors.matching, votedColors.notMatching]);

  const xDifferences = xScale(matches) || 0;

  const getPercentage = (value: number, { x }: { x?: number } = {}) => {
    const percentage = Math.round((value / total) * 100);
    if (!active || percentage < 12) {
      return null;
    }
    return (
      <Text
        x={(xScale(value) || 0) + (x || 0) - 4}
        y={height / 2 + 5}
        fontSize={14}
        textAnchor="end"
        fill={
          themeContext.colors.charts.piePercentage
        }>{`${percentage}%`}</Text>
    );
  };

  return (
    <G y={y} opacity={active ? 1 : 0.5}>
      <Rect
        width={xScale(matches)}
        height={height}
        fill={deviantColorRange('matches')}
      />
      {getPercentage(matches)}
      <Rect
        x={xDifferences}
        width={xScale(differences)}
        height={height}
        fill={deviantColorRange('differences')}
      />
      {getPercentage(differences, { x: xDifferences })}
    </G>
  );
};
