import React, { useContext } from 'react';
import {
  DetailVoteResultConstituencyFragment,
  DetailVoteResultConstituencyFragmentDoc,
} from 'generated/graphql';
import styled from 'styled-components/native';
import { ConstituencyContext } from 'context/constituency';
import { VoteVarificationNoConstituency } from 'screens/Voting/components/NoConstituency';
import { DeputyVoteData } from './Deputy';
import { filter } from 'graphql-anywhere';

interface Props extends DetailVoteResultConstituencyFragment {}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
`;

export const DetailVoteResultConstituency: React.FC<Props> = (props) => {
  const { constituency } = useContext(ConstituencyContext);
  if (!constituency) {
    return <VoteVarificationNoConstituency />;
  }

  return (
    <Container>
      <DeputyVoteData
        {...filter(DetailVoteResultConstituencyFragmentDoc, {
          ...props,
        })}
      />
    </Container>
  );
};
