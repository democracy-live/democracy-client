import React, { useContext, useMemo, useState } from 'react';
import { useWomFractionChartQuery } from 'generated/graphql';
import { FractionBarChart, WomPartyChartData } from './FractionBarChart';
import styled, { ThemeContext } from 'styled-components/native';
import { ChartLegend } from 'components/Charts/ChartLegend';
import { ChartLegendData } from '../../../../../components/Charts/ChartLegend';
import { useWindowDimensions } from 'react-native';
import { ChartNote } from 'screens/WahlOMeter/components/ChartNote';
import { VotesProgress } from 'screens/WahlOMeter/components/VotesProgress';

const ChartWrapper = styled.View`
  align-self: center;
`;

interface LocalVote {
  procedureId: string;
  selection: 'YES' | 'NO' | 'ABSTINATION';
}

interface Props {
  localVotes: LocalVote[];
}

const Container = styled.View``;

const Placeholder = styled.ActivityIndicator``;

export const WomFractionChart: React.FC<Props> = ({ localVotes }) => {
  const [selectedParty, setSelectedParty] = useState(0);
  const { width, height } = useWindowDimensions();
  const { data } = useWomFractionChartQuery({
    variables: {
      pageSize: Infinity,
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
    },
  });
  const theme = useContext(ThemeContext);

  const chartData = useMemo(() => {
    return data?.womFractionChart.procedures
      .reduce<WomPartyChartData[]>((prev, { procedureId, voteResults }) => {
        if (voteResults) {
          const localDecision = localVotes.find(
            (v) => v.procedureId === procedureId,
          );
          return voteResults.partyVotes.map(({ party, main }) => {
            const prevParty = prev.find((p) => p.party === party);
            if (prevParty && main === localDecision?.selection) {
              return {
                ...prevParty,
                deviants: {
                  ...prevParty.deviants,
                  matches: prevParty.deviants.matches + 1,
                },
              };
            } else if (prevParty) {
              return {
                ...prevParty,
                deviants: {
                  ...prevParty.deviants,
                  differences: prevParty.deviants.differences + 1,
                },
              };
            } else {
              return {
                party,
                deviants: {
                  matches: main === localDecision?.selection ? 1 : 0,
                  differences: main === localDecision?.selection ? 0 : 1,
                },
              };
            }
          });
        }
        return prev;
      }, [])
      .sort((a, b) => b.deviants.matches - a.deviants.matches);
  }, [data, localVotes]);

  const size = Math.min(width, height);

  if (!chartData) {
    return <Placeholder style={{ height: size, width: size }} />;
  }

  const votedColors = theme.colors.womCharts;

  const chartLegendData: ChartLegendData[] = [
    {
      label: 'Übereinstimmungen',
      value: chartData[selectedParty].deviants.matches,
      color: votedColors.matching,
    },
    {
      label: 'Differenzen',
      value: chartData[selectedParty].deviants.differences,
      color: votedColors.notMatching,
    },
  ];

  return (
    <Container>
      <VotesProgress
        completed={data?.womFractionChart.procedures.length || 0}
        total={data?.womFractionChart.total || 0}
      />
      <ChartWrapper>
        <FractionBarChart
          data={chartData}
          size={size - 48}
          setSelectedParty={setSelectedParty}
          selectedParty={selectedParty}
        />
      </ChartWrapper>
      <ChartLegend data={chartLegendData} />
      <ChartNote>
        Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren Parteien
        bedeuten nicht zwangsläufig eine inhaltliche Nähe dieser Parteien
        zueinander
      </ChartNote>
    </Container>
  );
};
