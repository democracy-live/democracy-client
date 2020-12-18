import Folding from 'components/Folding';
import {
  DetailDecisionBarChartFragmentDoc,
  DetailDecisionTextFragmentDoc,
  DetailFractionChartFragmentDoc,
  DetailGovernmentPieChartFragmentDoc,
  DetailVoteResultConstituencyFragmentDoc,
  useGovernmentVoteResultsQuery,
} from 'generated/graphql';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Carousel from 'pinar';
import { Dimensions } from 'react-native';
import { DetailGovernmentPieChart } from './BundestagPieChart';
import { filter } from 'graphql-anywhere';
import { DetailFractionChart } from './DetailFractionChart';
import { DetailDecisionBarChart } from './DetailDecisionBarChart';
import { DetailDecisionText } from './DetailDecisionText';
import { DetailVoteResultConstituency } from './Constituency';
import { ConstituencyContext } from 'context/constituency';

const Container = styled(Carousel).attrs(({ theme }) => ({
  activeDotStyle: {
    backgroundColor: theme.colors.primaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  dotsContainerStyle: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: theme.colors.secondaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
}))``;

const Description = styled.Text`
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
`;

const Highlighted = styled(Description)`
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface Props {
  procedureId: string;
}

export const GovernmentVoteResults: React.FC<Props> = ({ procedureId }) => {
  const { constituency } = useContext(ConstituencyContext);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const { data } = useGovernmentVoteResultsQuery({
    variables: {
      procedureId,
      constituencies: constituency ? [constituency] : [],
    },
  });

  useEffect(() => {
    const width = Dimensions.get('window').width;
    setDimensions({ width, height: width });
  }, []);

  if (!data || data.procedure.voteResults?.yes === undefined) {
    return null;
  }

  const voteType = data.procedure.voteResults.namedVote
    ? 'namentlich'
    : 'nicht-namentlich';

  const charts: any[] = [];
  if (data.procedure.voteResults) {
    charts.push(
      <DetailGovernmentPieChart
        key="governmentChart"
        {...filter(DetailGovernmentPieChartFragmentDoc, {
          ...data.procedure,
          size: dimensions.width,
        })}
        size={dimensions.width}
      />,
    );
    charts.push(
      <DetailFractionChart
        key="fractionChart"
        {...filter(DetailFractionChartFragmentDoc, {
          ...data.procedure,
          size: dimensions.width,
        })}
        size={dimensions.width}
      />,
    );
    charts.push(
      <DetailDecisionBarChart
        key="fractionChart"
        {...filter(DetailDecisionBarChartFragmentDoc, {
          ...data.procedure,
          size: dimensions.width,
        })}
        size={dimensions.width}
      />,
    );
    if (!data.procedure.voteResults.namedVote) {
      charts.push(
        <DetailDecisionText
          key="fractionChart"
          {...filter(DetailDecisionTextFragmentDoc, {
            ...data.procedure,
          })}
        />,
      );
    } else {
      charts.push(
        <DetailVoteResultConstituency
          key="constituencyVoteResult"
          {...filter(DetailVoteResultConstituencyFragmentDoc, {
            ...data.procedure,
          })}
        />,
      );
    }
  }

  return (
    <Folding title="Bundestagsergebnis" opened={data.procedure.voted}>
      <Container
        showsControls={false}
        style={{ height: dimensions.width + 30 }}>
        {charts}
      </Container>
      <Description>
        Diese Abstimmung wurde <Highlighted>{voteType}</Highlighted> abgestimmt
      </Description>
    </Folding>
  );
};
