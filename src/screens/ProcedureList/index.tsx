import React, { useCallback, useContext, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { useProceduresListQuery, Procedure } from 'generated/graphql';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BundestagTabNavigatorParamList } from 'navigation/Sidebar/Bundestag/TabNavigation';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';
import { StackNavigationProp } from '@react-navigation/stack';
import { NetworkStatus } from '@apollo/client';
import { ListFilterContext } from 'context/ListFilter';
import { ProcedureListItem } from './ListItem';
import { ListItemContentLoader } from 'components/ListItem/ContentLoader';

type ProfileScreenRouteProp = RouteProp<
  BundestagTabNavigatorParamList,
  'Sitzungswoche' | 'Top' | 'Vergangen'
>;

type NavigationProp = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Container = styled(FlatList as new () => FlatList<Procedure>)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

type Props = {};

export const ProcedureList: React.FC<Props> = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const [hasMoreData, setHasMoreData] = useState(true);
  const { proceduresFilter } = useContext(ListFilterContext);

  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus,
  } = useProceduresListQuery({
    variables: {
      listTypes: [route.params.list],
      pageSize: 10,
      filter: proceduresFilter,
    },
    notifyOnNetworkStatusChange: true,
  });

  const currentProcedureLength = data?.procedures.length || 0;

  const keyExtractor = useCallback(({ procedureId }) => procedureId, []);
  const onEndReached = useCallback(() => {
    if (!loading && hasMoreData) {
      fetchMore({
        variables: {
          offset: currentProcedureLength,
        },
      }).then(({ data: fetchMoreData }) => {
        if (fetchMoreData.procedures.length === 0) {
          setHasMoreData(false);
        }
      });
    }
  }, [currentProcedureLength, fetchMore, hasMoreData, loading]);

  const renderItem: ListRenderItem<Procedure> = useCallback(({ item }) => {
    return <ProcedureListItem {...item} />;
  }, []);

  const renderListFooterComponent = useCallback(() => {
    if (loading) {
      return <ActivityIndicator />;
    }
    return null;
  }, [loading]);

  const refreshing = networkStatus === NetworkStatus.refetch;

  if (!data) {
    return (
      <LoadingContainer>
        <ListItemContentLoader />
        <ListItemContentLoader />
        <ListItemContentLoader />
        <ListItemContentLoader />
        <ListItemContentLoader />
        <ListItemContentLoader />
        <ListItemContentLoader />
      </LoadingContainer>
    );
  }

  return (
    <Container
      data={data.procedures as Procedure[]}
      renderItem={renderItem}
      onRefresh={refetch}
      refreshing={refreshing}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooterComponent}
      scrollIndicatorInsets={{ right: 1 }}
      ItemSeparatorComponent={ListItemSeperator}
      // onEndReachedThreshold={1}
      onEndReached={onEndReached}
    />
  );
};
