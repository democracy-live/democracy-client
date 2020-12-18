import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { SearchHeader } from './Header';
import { Results } from './Results';
import SearchBar from 'react-native-search-bar';
import { SearchProvider } from 'context/Search';

const Wrapper = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 87 : undefined,
  keyboardShouldPersistTaps: 'never',
})`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const SearchScreen: React.FC = () => {
  const searchBar = useRef<SearchBar>(null);
  return (
    <SearchProvider>
      <Wrapper>
        <SearchHeader searchBarRef={searchBar} />
        <Results searchBarRef={searchBar} />
      </Wrapper>
    </SearchProvider>
  );
};
