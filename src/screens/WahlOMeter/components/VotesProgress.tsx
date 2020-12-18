import React from 'react';
import styled from 'styled-components/native';
import { RadialProgress } from './RadialProgress';

const Container = styled.View`
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 15px;
`;

interface Props {
  total: number;
  completed: number;
}

export const VotesProgress: React.FC<Props> = ({ total, completed }) => {
  return (
    <Container>
      <Text>
        {completed} / {total}
      </Text>
      <RadialProgress size={25} percentage={completed / total} />
    </Container>
  );
};
