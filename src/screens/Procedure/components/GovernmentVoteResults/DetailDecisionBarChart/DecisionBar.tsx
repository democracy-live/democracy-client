import { scaleLinear, scaleOrdinal } from 'd3';
import React, { useContext } from 'react';
import { G, Rect, Text } from 'react-native-svg';
import { ThemeContext } from 'styled-components';
import { DecitionBarPart } from '.';

interface Props {
  data: DecitionBarPart[];
  width: number;
  height: number;
  x?: number;
  xMax: number;
}

export const DecisionBar: React.FC<Props> = ({
  data,
  width,
  height,
  x,
  xMax,
}) => {
  const theme = useContext(ThemeContext);
  const yScale = scaleLinear().domain([0, xMax]).range([0, height]);

  const {
    Union,
    SPD,
    AfD,
    FDP,
    Linke,
    Grüne,
    fraktionslos,
  } = theme.colors.fractions;
  const backgroundColorRange = scaleOrdinal<string>()
    .domain(['Union', 'SPD', 'AfD', 'FDP', 'Linke', 'Grüne', 'fraktionslos'])
    .range([
      Union.background,
      SPD.background,
      AfD.background,
      FDP.background,
      Linke.background,
      Grüne.background,
      fraktionslos.background,
    ]);
  const textColorRange = scaleOrdinal<string>()
    .domain(['Union', 'SPD', 'AfD', 'FDP', 'Linke', 'Grüne', 'fraktionslos'])
    .range([
      Union.text,
      SPD.text,
      AfD.text,
      FDP.text,
      Linke.text,
      Grüne.text,
      fraktionslos.text,
    ]);

  return (
    <G x={x}>
      {
        data.reduce<{ rects: any[]; y: number }>(
          (prev, { party, sum }) => {
            return {
              rects: [
                ...prev.rects,
                <G key={`${party}`} y={prev.y - (yScale(sum) || 0)}>
                  <Rect
                    width={width}
                    height={yScale(sum) || 0}
                    fill={backgroundColorRange(party)}
                  />
                  {(yScale(sum) || 0) > 17 && (
                    <Text
                      fill={textColorRange(party)}
                      textAnchor="middle"
                      x={width / 2}
                      y={15}>
                      {party}
                    </Text>
                  )}
                </G>,
              ],
              y: prev.y - (yScale(sum) || 0),
            };
          },
          { rects: [], y: height },
        ).rects
      }
    </G>
  );
};
