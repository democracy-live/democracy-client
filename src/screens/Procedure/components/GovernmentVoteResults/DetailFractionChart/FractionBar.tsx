import { scaleLinear, scaleOrdinal, sum } from 'd3';
import React, { useContext } from 'react';
import { G, Rect, Text } from 'react-native-svg';
import { ThemeContext } from 'styled-components';

interface Props {
  data: {
    yes: number;
    abstination: number;
    no: number;
    notVoted?: number | null;
  };
  width: number;
  height: number;
  y?: number;
  active: boolean;
}

export const FractionBar: React.FC<Props> = ({
  data: { yes, abstination, no, notVoted },
  width,
  height,
  y,
  active,
}) => {
  const themeContext = useContext(ThemeContext);
  const total = sum([yes, abstination, no, notVoted]);
  const xScale = scaleLinear().domain([0, total]).range([0, width]);

  const votedColors = themeContext.colors.governmentVotes;

  const deviantColorRange = scaleOrdinal<string>()
    .domain(['yes', 'abstination', 'no', 'notVoted'])
    .range([
      votedColors.yes,
      votedColors.abstination,
      votedColors.no,
      votedColors.notVoted,
    ]);

  const xAbstination = xScale(yes) || 0;
  const xNo = xAbstination + (xScale(abstination) || 0);
  const xNotVoted = xNo + (xScale(no) || 0);

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
        width={xScale(yes)}
        height={height}
        fill={deviantColorRange('yes')}
      />
      {getPercentage(yes)}
      <Rect
        x={xAbstination}
        width={xScale(abstination)}
        height={height}
        fill={deviantColorRange('abstination')}
      />
      {getPercentage(abstination, { x: xAbstination })}
      <Rect
        x={xNo}
        width={xScale(no)}
        height={height}
        fill={deviantColorRange('no')}
      />
      {getPercentage(no, { x: xNo })}
      {!!notVoted && (
        <>
          <Rect
            x={xNotVoted}
            width={xScale(notVoted)}
            height={height}
            fill={deviantColorRange('notVoted')}
          />
          {getPercentage(notVoted, { x: xNotVoted })}
        </>
      )}
    </G>
  );
};
