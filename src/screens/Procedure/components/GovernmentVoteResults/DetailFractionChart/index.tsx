import React, { useContext, useState } from 'react';
import { DetailFractionChartFragment } from 'generated/graphql';
import { FractionBarChart } from './FractionBarChart';
import styled, { ThemeContext } from 'styled-components/native';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { ChartLegendData } from '../../../../../components/Charts/ChartLegend';

interface Props extends DetailFractionChartFragment {
  size: number;
}

const Container = styled.View`
  align-items: center;
`;

export const DetailFractionChart: React.FC<Props> = ({ voteResults, size }) => {
  const [selectedParty, setSelectedParty] = useState(0);
  const themeContext = useContext(ThemeContext);
  if (!voteResults) {
    return null;
  }

  const votedColors = themeContext.colors.governmentVotes;

  const chartLegendData: ChartLegendData[] = [
    {
      label: 'Zugestimmungen',
      value: voteResults.partyVotes[selectedParty].deviants.yes,
      color: votedColors.yes,
    },
    {
      label: 'Enthaltungen',
      value: voteResults.partyVotes[selectedParty].deviants.abstination,
      color: votedColors.abstination,
    },
    {
      label: 'Ablehnungen',
      value: voteResults.partyVotes[selectedParty].deviants.no,
      color: votedColors.no,
    },
  ];

  if (voteResults.namedVote) {
    chartLegendData.push({
      label: 'Abwesend',
      value: voteResults.partyVotes[selectedParty].deviants.notVoted || 0,
      color: votedColors.notVoted,
    });
  }

  return (
    <Container>
      <FractionBarChart
        data={voteResults.partyVotes}
        size={size - 48}
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
      />
      <ChartLegend data={chartLegendData} />
    </Container>
  );
};
