import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { WomPartyHeader } from './Header';
import { Procedure, useWomBundestagListQuery } from 'generated/graphql';
import { useNavigation } from '@react-navigation/native';
import { renderItem } from 'screens/WahlOMeter/Fraktionen/renderListItem';
import { NetworkStatus } from '@apollo/client';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const List = styled(FlatList as new () => FlatList<Procedure>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const WomPartyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasMoreData, setHasMoreData] = useState(true);
  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus,
  } = useWomBundestagListQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      pageSize: 10,
    },
  });

  const keyExtractor = useCallback(({ procedureId }) => procedureId, []);

  const currentProcedureLength = data?.womBundestagList.procedures.length || 0;
  const onEndReached = useCallback(() => {
    if (!loading && hasMoreData) {
      fetchMore({
        variables: {
          offset: currentProcedureLength,
        },
      }).then(({ data: fetchMoreData }) => {
        if (fetchMoreData.womBundestagList.procedures.length === 0) {
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
        data={(data?.womBundestagList.procedures as Procedure[]) || []}
        renderItem={renderItem({ navigation })}
        onRefresh={refetch}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        ListHeaderComponent={WomPartyHeader}
        ListFooterComponent={renderListFooterComponent}
        ItemSeparatorComponent={ListItemSeperator}
        onEndReached={onEndReached}
      />
    </Wrapper>
  );
};
