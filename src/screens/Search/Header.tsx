import React, { useContext } from 'react';
import SearchBar from 'react-native-search-bar';
import { debounce } from 'lodash';
import { Platform } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { SearchContext } from 'context/Search';
import { useFinishSearchMutation } from 'generated/graphql';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
`;

interface Props {
  searchBarRef: React.RefObject<SearchBar>;
}

export const SearchHeader: React.FC<Props> = ({ searchBarRef }) => {
  const theme = useTheme();
  const { setTerm, term, addToHistory } = useContext(SearchContext);
  const [executeFinishSearch] = useFinishSearchMutation();

  const finishSearch = () => {
    searchBarRef.current ? searchBarRef.current.unFocus() : undefined;
    addToHistory(term);
    executeFinishSearch({
      variables: {
        term,
      },
    });
  };

  // throttle to handle android enles changeing error
  const onChangeText =
    Platform.OS === 'ios'
      ? setTerm
      : debounce((text: string) => setTerm(text), 300);

  return (
    <Wrapper>
      <SearchBar
        ref={searchBarRef}
        placeholder="Suche"
        text={term}
        onChangeText={onChangeText}
        onSearchButtonPress={finishSearch}
        showsCancelButton={false}
        showsCancelButtonWhileEditing={false}
        textFieldBackgroundColor={theme.backgroundColor}
        hideBackground
      />
    </Wrapper>
  );
};
