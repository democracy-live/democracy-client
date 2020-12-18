import React from 'react';
import styled from 'styled-components/native';
import {
  DetailActionBarFragment,
  DetailActionBarFragmentDoc,
} from 'generated/graphql';
import Folding from 'components/Folding';
import { VerifyOverlay } from './components/VerifyOverlay';
import { VoteButtons } from './components/VoteButtons';
import { PostVotedButtons } from './components/PostVotedButtons';
import { filter } from 'graphql-anywhere';

const Container = styled.View`
  /* margin-top: ${({ theme }) => theme.paddings.outer}; */
  margin-horizontal: ${({ theme }) => theme.paddings.outer};
`;

const Title = styled.Text`
  font-size: 18px;
`;

const TitleAddition = styled.Text`
  font-size: 18px;
  color: grey;
  padding-left: 5px;
`;

interface Props extends DetailActionBarFragment {}

export const ActionBar: React.FC<Props> = (props) => {
  const { type, voted } = props;
  return (
    <Folding
      disableCollapseing
      opened
      title={
        <>
          <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>{' '}
          <TitleAddition>über {type}</TitleAddition>
        </>
      }>
      <VerifyOverlay />
      <Container>
        {!voted ? (
          <VoteButtons {...filter(DetailActionBarFragmentDoc, props)} />
        ) : (
          <PostVotedButtons {...filter(DetailActionBarFragmentDoc, props)} />
        )}
      </Container>
    </Folding>
  );
};
