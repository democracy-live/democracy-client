import React from 'react';
import styled from 'styled-components/native';
import { arc, pie, scaleOrdinal } from 'd3';
import { PieArcDatum } from 'd3-shape';
import { G, Text, Svg, Path } from 'react-native-svg';
import { getTheme } from 'styles/theme';

const Container = styled.View`
  margin-horizontal: ${({ theme }) => theme.paddings.outer};
  margin-vertical: ${({ theme }) => theme.paddings.outer};
  align-items: center;
`;

const TopContainere = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  right: 0;
`;

const TopLeftText = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

interface ChartEntry {
  name: string;
  value: number;
}

export interface VotesDataEntry {
  [selection: string]: number;
}

interface Props {
  votesData: VotesDataEntry;
  colors: string[];
  innerTextTop: string;
  innerTextBottom: string;
  size: number;
  topLeftText?: string;
  topRightSvg?: any;
  total: number;
  hidePercentage?: boolean;
}

export const PieChart: React.FC<Props> = ({
  votesData,
  colors,
  innerTextTop,
  innerTextBottom,
  size,
  topLeftText,
  topRightSvg,
  total,
  hidePercentage = false,
}) => {
  const chartSize = size - size / 5;
  const dataLabels = Object.keys(votesData);

  const preparedData = dataLabels.map((label) => ({
    name: label,
    value: votesData[label],
  }));

  const pieObj = pie<ChartEntry>()
    .value((d) => {
      return d.value;
    })
    .sort(null);

  const arcs = pieObj(preparedData);

  const pieEntryData = arcs.map((value) => {
    const arcGenerator = arc<PieArcDatum<ChartEntry>>()
      .outerRadius(chartSize / 2)
      .innerRadius(chartSize / 6);
    const path = arcGenerator(value);

    const textTransform = arcGenerator.centroid(value);

    const percentage = Math.round((value.data.value / total) * 100);

    return {
      path,
      textTransform,
      percentage,
    };
  });

  const vetColors = scaleOrdinal<string>().domain(dataLabels).range(colors);

  return (
    <Container>
      {!!topLeftText && (
        <TopContainere>
          <TopLeftText>{topLeftText}</TopLeftText>

          {topRightSvg}
        </TopContainere>
      )}
      <Svg width={chartSize} height={chartSize}>
        <G x={chartSize / 2} y={chartSize / 2}>
          {
            // pieChart has all the svg paths calculated in step 2)
            pieEntryData.map(({ path, textTransform, percentage }, index) =>
              path ? (
                <G key={'pie_shape_' + index}>
                  <Path
                    fill={vetColors(preparedData[index].name)}
                    strokeWidth={chartSize / 100}
                    d={path}
                  />
                  {!hidePercentage && percentage > 3 && (
                    <Text
                      y="6"
                      transform={{ translate: textTransform }}
                      fontSize={'18'}
                      textAnchor="middle"
                      fill={getTheme().colors.primaryText}>
                      {`${percentage}%`}
                    </Text>
                  )}
                </G>
              ) : null,
            )
          }
        </G>
        <G x={chartSize / 2} y={chartSize / 2}>
          <Text
            y={-4}
            fontSize="18"
            textAnchor="middle"
            fill={getTheme().colors.primaryText}>
            {innerTextTop}
          </Text>
          <Text
            y={15}
            fontSize="14"
            textAnchor="middle"
            fill={getTheme().colors.primaryText}>
            {innerTextBottom}
          </Text>
        </G>
      </Svg>
    </Container>
  );
};
