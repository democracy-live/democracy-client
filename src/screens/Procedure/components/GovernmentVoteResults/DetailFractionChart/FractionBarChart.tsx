import { scaleBand } from 'd3';
import React, { useContext } from 'react';
import Svg, { G, Rect, Text } from 'react-native-svg';
import { ThemeContext } from 'styled-components';
import { FractionBar } from './FractionBar';

interface PartyData {
  party: string;
  deviants: {
    yes: number;
    abstination: number;
    no: number;
    notVoted?: number | null;
  };
}

interface Props {
  data: PartyData[];
  size: number;
  setSelectedParty: (i: number) => void;
  selectedParty: number;
}

export const FractionBarChart: React.FC<Props> = ({
  data,
  size,
  selectedParty,
  setSelectedParty,
}) => {
  const themeContext = useContext(ThemeContext);
  const margin = {
    top: 11,
    right: 11,
    bottom: 0,
    left: 80,
  };
  const innerWidth = size - margin.right - margin.left;
  const innerHeight = size - margin.top - margin.bottom - 13;

  const yValue = ({ party }: { party: string }) => party;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2);

  return (
    <Svg width={size} height={size - 13}>
      <G y={margin.top + 3}>
        {data.map(({ party }, i) => (
          <Text
            opacity={i === selectedParty ? 1 : 0.5}
            key={`axis-${party}`}
            y={
              yScale.bandwidth() +
              ((yScale(party) || 0) - yScale.bandwidth() / 2)
            }
            fill={themeContext.colors.primaryText}>
            {party}
          </Text>
        ))}
      </G>
      <G translate={[margin.left, margin.top]}>
        {data.map(({ party, deviants }, i) => (
          <G key={`bar-${party}`}>
            <FractionBar
              active={i === selectedParty}
              y={yScale(party)}
              data={deviants}
              width={innerWidth}
              height={yScale.bandwidth()}
            />
            <Rect // onPress overlay
              onPress={() => setSelectedParty(i)}
              y={yScale(party)}
              x={-margin.left}
              width={size}
              height={yScale.bandwidth()}
              //   fill="#ff0"
            />
          </G>
        ))}
      </G>
    </Svg>
  );
};
