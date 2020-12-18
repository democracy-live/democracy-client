import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';
import { useWomBundestagPieChartQuery } from 'generated/graphql';
import React, { useMemo } from 'react';
import {
  PieChart,
  VotesDataEntry,
} from 'screens/Procedure/components/PieChart';
import { ChartNote } from 'screens/WahlOMeter/components/ChartNote';
import { VotesProgress } from 'screens/WahlOMeter/components/VotesProgress';
import styled, { useTheme } from 'styled-components/native';

const Container = styled.View``;

interface ChartData extends VotesDataEntry {
  matches: number;
  differences: number;
}

interface LocalVote {
  procedureId: string;
  selection: 'YES' | 'NO' | 'ABSTINATION';
}

interface Props {
  localVotes: LocalVote[];
}

export const WomBundestagPieChart: React.FC<Props> = ({ localVotes }) => {
  const theme = useTheme();
  const { data } = useWomBundestagPieChartQuery({
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: Infinity,
    },
  });

  const total = data?.womBundestagPieChart.total;
  const proceduresSum = data?.womBundestagPieChart.procedures.length;

  const chartData = useMemo(() => {
    return (
      data?.womBundestagPieChart.procedures.reduce<ChartData>(
        (prev, { procedureId, voteResults }) => {
          if (voteResults) {
            const localDecision = localVotes.find(
              (v) => v.procedureId === procedureId,
            );
            if (voteResults.governmentDecision === localDecision?.selection) {
              return { ...prev, matches: prev.matches + 1 };
            }
            return { ...prev, differences: prev.differences + 1 };
          }
          return prev;
        },
        {
          matches: 0,
          differences: 0,
        },
      ) || {
        matches: 0,
        differences: 0,
      }
    );
  }, [data, localVotes]);

  const colors = [
    theme.colors.womCharts.matching,
    theme.colors.womCharts.notMatching,
  ];

  const legendData: ChartLegendData[] = [
    {
      label: 'Übereinstimmungen',
      value: chartData.matches,
      color: theme.colors.womCharts.matching,
    },
    {
      label: 'Differenzen',
      value: chartData.differences,
      color: theme.colors.womCharts.notMatching,
    },
  ];

  return (
    <Container>
      <VotesProgress completed={proceduresSum || 0} total={total || 0} />

      <PieChart
        colors={colors}
        innerTextBottom="Wahl-O-Meter"
        innerTextTop="Bundestag"
        votesData={chartData}
        size={500}
        total={15}
      />
      <ChartLegend data={legendData} />
      <ChartNote>
        Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten
        eine inhaltliche Nähe zu den Regierungsfraktionen
      </ChartNote>
    </Container>
  );
};
