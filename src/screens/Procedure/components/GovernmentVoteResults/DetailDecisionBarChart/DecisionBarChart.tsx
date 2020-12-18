import { max, scaleBand } from 'd3';
import React from 'react';
import Svg, { G } from 'react-native-svg';
import { DecitionBarPart, DecitionChartData } from '.';
import { DecisionBar } from './DecisionBar';

interface Props {
  data: DecitionChartData;
  size: number;
}

export const DecisionBarChart: React.FC<Props> = ({ data, size }) => {
  const margin = {
    top: 11,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const height = size - 60;
  const innerWidth = size - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const sumDecision = (v: DecitionBarPart[]) =>
    v.reduce<number>((prev, { sum }) => prev + sum, 0);

  const xMax =
    max([
      sumDecision(data.yes),
      sumDecision(data.abstination),
      sumDecision(data.no),
      sumDecision(data.notVoted || []),
    ]) || 0;
  if (!data.notVoted) {
    delete data.notVoted;
  }
  const xScale = scaleBand()
    .domain(Object.keys(data))
    .range([0, innerWidth])
    .padding(0.4);

  return (
    <Svg width={size} height={height}>
      <G translate={[margin.left, margin.top]}>
        {Object.keys(data).map((decision) => (
          <G key={`bar-${decision}`}>
            <DecisionBar
              x={xScale(decision) || 0}
              data={data[decision as keyof DecitionChartData] || []}
              height={innerHeight}
              width={xScale.bandwidth()}
              xMax={xMax}
            />
          </G>
        ))}
      </G>
    </Svg>
  );
};
