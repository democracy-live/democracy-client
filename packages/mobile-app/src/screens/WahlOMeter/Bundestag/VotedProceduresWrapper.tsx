import React, { useContext, ReactElement } from 'react';
import styled from 'styled-components/native';
import unionBy from 'lodash.unionby';

// GraphQL
import { FlatList } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { pieChartGovernmentData } from '../../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { ChainEntry } from '../../../lib/VotesLocal';
import { PROCEDURES_BY_HAVING_VOTE_RESULTS } from '../graphql/queries/proceduresByIdHavingVoteResults';
import {
  ProceduresByIdHavingVoteResultsVariables,
  ProceduresByIdHavingVoteResults,
  ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures,
} from '../graphql/queries/__generated__/ProceduresByIdHavingVoteResults';
import {
  PartyChartData,
  PartyChartDataVariables,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/PartyChartData';
import { PARTY_CHART_DATA } from '../../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';
import { useQuery } from '@apollo/client';

const Container = styled.View`
  background-color: #fff;
`;

export interface ChartData {
  votedProcedures: PartyChartData;
  localVotes: ChainEntry[];
}
interface ChildProps {
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item: ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures;
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({
  onProcedureListItemClick,
  children,
}) => {
  const { localVotes, getLocalVoteSelection } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    PartyChartData,
    PartyChartDataVariables
  >(PARTY_CHART_DATA, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });

  const { data: procedurListData, fetchMore, networkStatus } = useQuery<
    ProceduresByIdHavingVoteResults,
    ProceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_BY_HAVING_VOTE_RESULTS, {
    variables: { offset: 0, pageSize: 10 },
    returnPartialData: true,
  });

  let hasMore = true;
  // if (!localVotes || localVotes.length === 0) {
  //   return <NoVotesPlaceholder subline="Bundestag" />;
  // }
  let totalProcedures = 0;
  if (proceduresData && proceduresData.partyChartProcedures) {
    totalProcedures = proceduresData.partyChartProcedures.total || 0;
  }
  if (!procedurListData || !proceduresData) {
    return <ListLoading />;
  }
  const listData =
    procedurListData &&
    procedurListData.proceduresByIdHavingVoteResults3 &&
    procedurListData.proceduresByIdHavingVoteResults3.procedures
      ? procedurListData.proceduresByIdHavingVoteResults3.procedures
      : [];

  return (
    <Container>
      <FlatList<
        | 'chart'
        | ProceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults3_procedures
      >
        data={['chart', ...listData]}
        renderItem={({ item }) => {
          const localSelection =
            item !== 'chart'
              ? getLocalVoteSelection(item.procedureId)
              : undefined;
          const voted = !!localSelection;
          return item === 'chart' ? (
            (children as (props: ChildProps) => ReactElement)({
              totalProcedures,
              chartData: {
                votedProcedures: proceduresData,
                localVotes,
              },
            })
          ) : (
            <Row onPress={() => onProcedureListItemClick({ item })}>
              <ListItem
                {...item}
                subline={
                  item.sessionTOPHeading
                    ? item.sessionTOPHeading
                    : item.subjectGroups.join(', ')
                }
                votes={item.communityVotes ? item.communityVotes.total || 0 : 0}
                govermentChart={{
                  votes: pieChartGovernmentData({
                    ...item,
                    largeDecision: item.voteResults
                      ? item.voteResults.governmentDecision
                      : undefined,
                  }),
                }}
                communityVotes={communityVoteData({
                  ...item,
                  localSelection,
                  voted,
                })}
              />
            </Row>
          );
        }}
        ListFooterComponent={() =>
          networkStatus === 3 ? <ListLoading /> : null
        }
        onEndReached={() =>
          hasMore &&
          listData.length > 0 &&
          fetchMore({
            variables: {
              offset:
                procedurListData.proceduresByIdHavingVoteResults3.procedures
                  .length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              if (
                hasMore &&
                fetchMoreResult.proceduresByIdHavingVoteResults3.procedures
                  .length === 0
              ) {
                hasMore = false;
              }
              prev.proceduresByIdHavingVoteResults3.procedures;
              return Object.assign({}, prev, {
                proceduresByIdHavingVoteResults3: {
                  ...prev.proceduresByIdHavingVoteResults3,
                  procedures: unionBy(
                    prev.proceduresByIdHavingVoteResults3.procedures,
                    fetchMoreResult.proceduresByIdHavingVoteResults3.procedures,
                    '_id',
                  ),
                },
              });
            },
          })
        }
        keyExtractor={item => (item === 'chart' ? item : item.procedureId)}
      />
    </Container>
  );
};

export default VotedProceduresWrapper;
