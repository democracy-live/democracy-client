import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchBar from 'react-native-search-bar';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import {
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
  Procedure,
  useFinishSearchMutation,
  useMostSearchedQuery,
  useSearchProceduresLazyQuery,
} from 'generated/graphql';
import { SearchContext } from 'context/Search';
import { ListItem } from 'components/ListItem';
import { Segment } from 'components/Segment';
import { GovernmentPieChart } from 'screens/ProcedureList/components/GovernmentPieChart';
import { CommunityPieChart } from 'screens/ProcedureList/components/CommunityPieChart';
import { filter } from 'graphql-anywhere';

const isProcedureGuard = (
  searchItem: string | Procedure,
): searchItem is Procedure => {
  return (
    typeof searchItem !== 'string' &&
    (searchItem as Procedure).procedureId !== undefined
  );
};

const ListText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
  padding-left: 8px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Row = styled.TouchableOpacity`
  justify-content: center;
  min-height: 35px;
`;

const ItemSeperator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  opacity: 0.5;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
}))``;

const LoadingWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 18px;
`;

const NoResultsWrapper = styled.View`
  flex: 1;
  padding-top: 18px;
  align-items: center;
`;

const NoResultsImage = styled.Image.attrs(() => ({
  source: require('./assets/search_no_results.png'),
  opacity: 0.2,
}))`
  margin-top: 18px;
`;

interface Props {
  searchBarRef: React.RefObject<SearchBar>;
}

export const Results: React.FC<Props> = ({ searchBarRef }) => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagStackNavigatorParamList>
  >();
  const [executeFinishSearch] = useFinishSearchMutation();
  const { setTerm, term, history } = useContext(SearchContext);
  const {
    data: mostSearchedTerms,
    loading: loadingMostSearched,
  } = useMostSearchedQuery();
  const [
    executeSearch,
    { data: searchData, loading: loadingSearchProcedures, error: searchError },
  ] = useSearchProceduresLazyQuery({
    variables: {
      term,
    },
  });

  useEffect(() => {
    if (term.length > 0) {
      executeSearch();
      executeFinishSearch({
        variables: { term },
      });
    }
  }, [term, executeSearch, executeFinishSearch]);

  // TODO handle errors
  if (searchError) {
    // Alert.alert(JSON.stringify(searchError));
  }

  const loading =
    (loadingMostSearched && history.length === 0) || loadingSearchProcedures;

  const onItemClick = ({
    item,
    section,
  }: {
    item: string | Procedure;
    section: string;
  }) => () => {
    searchBarRef.current ? searchBarRef.current.unFocus() : undefined;
    if (section === 'Ergebnisse' && isProcedureGuard(item)) {
      navigation.navigate('Procedure', {
        procedureId: item.procedureId,
        title: item.type || item.procedureId,
      });
    } else if (typeof item === 'string') {
      setTerm(item);
    }
  };

  const handleSearchResults = ({
    searchProceduresAutocomplete: { procedures, autocomplete },
  }: any) => {
    return [
      { title: 'Vorschläge', data: autocomplete },
      { title: 'Ergebnisse', data: procedures },
    ];
  };

  let sectionData: { title: string; data: any[] }[] = [];
  if (!term) {
    sectionData = [
      {
        title: 'Zuletzt gesucht',
        data: history,
      },
      {
        title: 'Meistgesucht',
        data: mostSearchedTerms
          ? mostSearchedTerms.mostSearched.map(({ term: value }) => value)
          : [],
      },
    ];
  } else {
    sectionData = searchData ? handleSearchResults(searchData) : [];
  }

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator />
        </LoadingWrapper>
      )}
      {!loading && (
        <SectionList<string | Procedure>
          keyboardShouldPersistTaps={'always'}
          sections={sectionData}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length > 0 ? <Segment text={title} /> : null
          }
          renderItem={({ item, section: { title } }) => (
            <Row onPress={onItemClick({ item, section: title })}>
              <>
                {title === 'Ergebnisse' && isProcedureGuard(item) && (
                  <ListItem
                    {...item}
                    sessionTOPHeading={item.sessionTOPHeading}
                    votes={
                      item.communityVotes ? item.communityVotes.total || 0 : 0
                    }
                    renderPieCharts={[
                      <GovernmentPieChart
                        key={`government-piechart-${item.procedureId}`}
                        {...filter(GovernmentVotesPieChartFragmentDoc, item)}
                      />,
                      <CommunityPieChart
                        key={`community-piechart-${item.procedureId}`}
                        {...filter(CommunityVotesPieChartFragmentDoc, item)}
                      />,
                    ]}
                  />
                )}
                {title === 'Zuletzt gesucht' && <ListText>{item}</ListText>}
                {title === 'Vorschläge' && <ListText>{item}</ListText>}
                {title === 'Meistgesucht' && <ListText>{item}</ListText>}
              </>
            </Row>
          )}
          keyExtractor={(item) => (!isProcedureGuard(item) ? item : item._id)}
          ListEmptyComponent={() => {
            if (term) {
              return (
                <NoResultsWrapper>
                  <Text>Leider nichts gefunden.</Text>
                  <NoResultsImage />
                </NoResultsWrapper>
              );
            }
            return null;
          }}
          ItemSeparatorComponent={() => <ItemSeperator />}
        />
      )}
    </>
  );
};
