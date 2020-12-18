import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { Procedure, useWomConstituencyListQuery } from 'generated/graphql';
import { useNavigation } from '@react-navigation/native';
import { renderItem } from './renderListItem';
import { NetworkStatus } from '@apollo/client';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';
import { WomConstituencyHeader } from './Header';
import { ConstituencyContext } from 'context/constituency';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const List = styled(FlatList as new () => FlatList<Procedure>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const WomConstituencyList: React.FC = () => {
  const navigation = useNavigation();
  const [hasMoreData, setHasMoreData] = useState(true);
  const { constituency } = useContext(ConstituencyContext);
  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus,
  } = useWomConstituencyListQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      constituency,
      directCandidate: true,
      pageSize: 10,
    },
  });

  const keyExtractor = useCallback(({ procedureId }) => procedureId, []);

  const currentProcedureLength =
    data?.womConstituencyList[0]?.procedures.length || 0;

  const onEndReached = useCallback(() => {
    if (!loading && hasMoreData) {
      fetchMore({
        variables: {
          offset: currentProcedureLength,
        },
      }).then(({ data: fetchMoreData }) => {
        if (fetchMoreData.womConstituencyList[0].procedures.length === 0) {
          setHasMoreData(false);
        }
      });
    }
  }, [currentProcedureLength, fetchMore, hasMoreData, loading]);

  const renderListFooterComponent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return null;
  }, [loading]);

  const refreshing = networkStatus === NetworkStatus.refetch;

  return (
    <Wrapper>
      <List
        data={
          ((data?.womConstituencyList[0]?.procedures.map(
            ({ procedure, decision }) => ({ ...procedure, decision }),
          ) as unknown) as (Procedure & { decision: string })[]) || []
        }
        renderItem={renderItem({ navigation })}
        onRefresh={refetch}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        ListHeaderComponent={WomConstituencyHeader}
        ListFooterComponent={renderListFooterComponent}
        ItemSeparatorComponent={ListItemSeperator}
        onEndReached={onEndReached}
      />
    </Wrapper>
  );
};
