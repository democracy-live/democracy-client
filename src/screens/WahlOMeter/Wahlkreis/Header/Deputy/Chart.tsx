import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import Svg from 'react-native-svg';

// Components
import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';
import { ChartNote } from 'screens/WahlOMeter/components/ChartNote';
import {
  BarData,
  FractionBar,
} from 'screens/WahlOMeter/Fraktionen/Header/WomFractionChart/FractionBar';
import { useWindowDimensions } from 'react-native';
import { WomDeputyChartFragment } from 'generated/graphql';
import { LocalVotesContext } from 'context/LocalVotes';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const ChartWrapper = styled.View`
  align-items: center;
`;

interface Props extends WomDeputyChartFragment {}

export const WomDeputyChart: React.FC<Props> = ({ procedures }) => {
  const { width, height } = useWindowDimensions();
  const { localVotes } = useContext(LocalVotesContext);
  const theme = useContext(ThemeContext);
  const chartWidth = Math.min(width, height) - 2 * 11;

  const data: BarData = procedures.reduce<BarData>(
    (prev, procedure) => {
      const localVote = localVotes.find(
        (lv) => lv.procedureId === procedure.procedure.procedureId,
      );
      if (localVote) {
        if (localVote.selection === procedure.decision) {
          return {
            ...prev,
            matches: prev.matches + 1,
          };
        } else {
          return {
            ...prev,
            differences: prev.differences + 1,
          };
        }
      }
      return prev;
    },
    {
      matches: 0,
      differences: 0,
    },
  );
  const legendData: ChartLegendData[] = [
    {
      label: 'Übereinstimmungen',
      color: theme.colors.womCharts.matching,
      value: data.matches,
    },
    {
      label: 'Differenzen',
      color: theme.colors.womCharts.notMatching,
      value: data.differences,
    },
  ];
  return (
    <Wrapper>
      <ChartWrapper>
        <Svg width={chartWidth} height={30}>
          <FractionBar active height={30} width={chartWidth} data={data} />
        </Svg>
      </ChartWrapper>
      <ChartLegend data={legendData} />
      <ChartNote>
        Hohe Übereinstimmungen Ihrer Stellungnahmen mit Ihrem Direktkandidaten
        bedeuten eine inhaltliche Nähe zu diesem Abgeordneten
      </ChartNote>
    </Wrapper>
  );
};
