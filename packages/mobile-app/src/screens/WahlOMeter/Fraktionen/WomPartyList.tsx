import React, { useContext } from 'react';
import styled from 'styled-components/native';
import unionBy from 'lodash.unionby';

// GraphQL
import { FlatList, Text } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { useQuery } from '@apollo/client';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { ChainEntry } from '../../../lib/VotesLocal';
import { PartyChartData } from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/PartyChartData';
import { pieChartPartyData } from '../../../lib/helper/PieChartPartyData';
import {
  VotedPartyProceduresVariables,
  VotedPartyProcedures,
  VotedPartyProcedures_procedurecForWomPartyList_procedures,
} from './graphql/queries/__generated__/VotedPartyProcedures';
import { VOTED_PARTY_PROCEDURES } from './graphql/queries/proceduresByIdHavingVoteResults';
import { WomPartyChart } from './WomPartyChart';
import { WomPartyContext } from './context';

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
    item: VotedPartyProcedures_procedurecForWomPartyList_procedures;
  }) => void;
}

const WomPartyList: React.FC<Props> = ({ onProcedureListItemClick }) => {
  const { party } = useContext(WomPartyContext);
  const { getLocalVoteSelection } = useContext(LocalVotesContext);

  const {
    data: procedurListData,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useQuery<VotedPartyProcedures, VotedPartyProceduresVariables>(
    VOTED_PARTY_PROCEDURES,
    {
      returnPartialData: true,
      variables: { offset: 0, pageSize: 10 },
    },
  );

  let hasMore = true;
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (loading) {
    return <ListLoading />;
  }
  if (!procedurListData) {
    return <Text>No_DATA</Text>;
  }
  const listData =
    procedurListData &&
    procedurListData.procedurecForWomPartyList &&
    procedurListData.procedurecForWomPartyList.procedures
      ? procedurListData.procedurecForWomPartyList.procedures
      : [];
  return (
    <Container>
      <FlatList<VotedPartyProcedures_procedurecForWomPartyList_procedures>
        ListHeaderComponent={WomPartyChart}
        data={listData}
        renderItem={({ item }) => {
          const localSelection = getLocalVoteSelection(item.procedureId);
          const voted = !!localSelection;
          return (
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
                  votes: party
                    ? pieChartPartyData({
                        ...item,
                        votedGovernment: item.votedGovernment,
                        partyVotes: item.voteResults?.partyVotes,
                        selectedParty: party,
                      })
                    : undefined,
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
        onEndReached={() => {
          if (hasMore && listData.length > 0) {
            fetchMore({
              query: VOTED_PARTY_PROCEDURES,
              variables: {
                offset:
                  procedurListData.procedurecForWomPartyList.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!prev) {
                  throw new Error('prev is undefined');
                }
                if (!fetchMoreResult) {
                  return prev;
                }
                if (
                  hasMore &&
                  fetchMoreResult.procedurecForWomPartyList.procedures
                    .length === 0
                ) {
                  hasMore = false;
                }
                prev.procedurecForWomPartyList.procedures;
                return Object.assign({}, prev, {
                  procedurecForWomPartyList: {
                    ...prev.procedurecForWomPartyList,
                    procedures: unionBy(
                      prev.procedurecForWomPartyList.procedures,
                      fetchMoreResult.procedurecForWomPartyList.procedures,
                      '_id',
                    ),
                  },
                });
              },
            });
          }
        }}
        keyExtractor={item => item.procedureId}
      />
    </Container>
  );
};

export default WomPartyList;
