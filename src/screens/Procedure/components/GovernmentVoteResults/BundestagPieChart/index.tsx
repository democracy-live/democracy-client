import React, { useContext } from 'react';
import { PieChart } from '../../PieChart';
import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';
import { DetailGovernmentPieChartFragment } from 'generated/graphql';
import { ThemeContext } from 'styled-components';
import { ActivityIndicator } from 'react-native';

interface Props extends DetailGovernmentPieChartFragment {
  size: number;
}

export const DetailGovernmentPieChart: React.FC<Props> = ({
  voteResults,
  size,
}) => {
  const themeContext = useContext(ThemeContext);
  if (!voteResults) {
    return <ActivityIndicator />;
  }

  const total =
    voteResults.yes +
    voteResults.abstination +
    voteResults.no +
    (voteResults.notVoted || 0);

  const voteType = voteResults.namedVote ? 'namentlich' : 'nicht-namentlich';

  const innerTextTop =
    voteType === 'namentlich' ? total : voteResults.partyVotes.length;

  const votedColors = themeContext.colors.governmentVotes;

  const colorRange = [
    votedColors.yes,
    votedColors.abstination,
    votedColors.no,
    votedColors.notVoted,
  ];

  const votesData = voteResults
    ? {
        yes: voteResults.yes,
        abstination: voteResults.abstination,
        no: voteResults.no,
        notVoted: voteResults.notVoted || 0,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
        notVoted: 0,
      };

  const legendData: ChartLegendData[] = [
    {
      label: 'Zustimmungen',
      value: votesData.yes,
      color: colorRange[0],
    },
    {
      label: 'Enthaltungen',
      value: votesData.abstination,
      color: colorRange[1],
    },
    {
      label: 'Ablehnungen',
      value: votesData.no,
      color: colorRange[2],
    },
    {
      label: 'Nicht Abgestimmt',
      value: votesData.notVoted || 0,
      color: colorRange[3],
    },
  ];

  return (
    <>
      <PieChart
        innerTextBottom={
          voteType === 'namentlich' ? 'Abgeordnete' : 'Fraktionen'
        }
        innerTextTop={`${innerTextTop}`}
        votesData={votesData}
        colors={colorRange}
        size={size}
        total={total}
      />
      <ChartLegend data={legendData} />
    </>
  );
};
