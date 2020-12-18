import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { arc, pie, scaleOrdinal } from 'd3';
import { PieArcDatum } from 'd3-shape';
import { G, Svg, Path } from 'react-native-svg';

const Container = styled.View`
  margin-horizontal: ${({ theme }) => theme.paddings.outer};
  margin-vertical: ${({ theme }) => theme.paddings.outer};
  align-items: center;
`;

interface ChartEntry {
  name: string;
  value: number;
}

export interface VotesDataEntry {
  [selection: string]: number;
}

interface Props {
  percentage: number;
  size: number;
}

export const RadialProgress: React.FC<Props> = ({ percentage, size }) => {
  const theme = useTheme();
  const chartSize = size - size / 5;

  const dataLabels = ['complete', 'incomplete'];
  const colors = [theme.colors.primaryColoredText, theme.colors.secondaryText];

  const preparedData = [
    {
      name: 'complete',
      value: percentage,
    },
    {
      name: 'incomplete',
      value: 1 - percentage,
    },
  ];

  const pieObj = pie<ChartEntry>()
    .value((d) => {
      return d.value;
    })
    .sort(null);

  const arcs = pieObj(preparedData);

  const pieEntryData = arcs.map((value) => {
    const arcGenerator = arc<PieArcDatum<ChartEntry>>()
      .outerRadius(chartSize / 2)
      .innerRadius(chartSize / 2.5);
    const path = arcGenerator(value);

    const textTransform = arcGenerator.centroid(value);

    const percentages = Math.round((value.data.value / 100) * 100);

    return {
      path,
      textTransform,
      percentage: percentages,
    };
  });

  const vetColors = scaleOrdinal<string>().domain(dataLabels).range(colors);

  return (
    <Container>
      <Svg width={chartSize} height={chartSize}>
        <G x={chartSize / 2} y={chartSize / 2}>
          {
            // pieChart has all the svg paths calculated in step 2)
            pieEntryData.map(({ path }, index) =>
              path ? (
                <G key={'pie_shape_' + index}>
                  <Path
                    fill={vetColors(preparedData[index].name)}
                    strokeWidth={chartSize / 100}
                    d={path}
                  />
                </G>
              ) : null,
            )
          }
        </G>
      </Svg>
    </Container>
  );
};
