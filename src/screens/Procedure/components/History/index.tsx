import React from 'react';
import styled from 'styled-components/native';
import { Procedure, ProcedureHistoryFragment } from 'generated/graphql';
import Folding from 'components/Folding';

const Container = styled.View`
  /* margin-top: ${({ theme }) => theme.paddings.outer}; */
  margin-horizontal: ${({ theme }) => theme.paddings.outer};
`;

const StateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.paddings.outer};
`;

interface IconProps {
  currentStatus: Procedure['currentStatus'];
  state: string;
}

const Icon = styled.View<IconProps>`
  width: 19px;
  height: 19px;
  border-radius: 9px;
  background-color: ${({ currentStatus, state, theme }) => {
    if (state === '2. Beratung / 3. Beratung' || state === '1. Beratung') {
      return '#9b9b9b';
    }
    return currentStatus === state
      ? theme.colors.header
      : theme.colors.primaryText;
  }};
`;

const State = styled.Text`
  font-size: 13px;
  padding-left: ${({ theme }) => theme.paddings.outer};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const Line = styled.View`
  position: absolute;
  width: 1px;
  left: 9px;
  top: 18px;
  bottom: 22px;
  background-color: #979797;
`;

interface Props extends ProcedureHistoryFragment {}

export const History: React.FC<Props> = ({
  currentStatusHistory,
  currentStatus,
}) => {
  if (currentStatusHistory.length === 0) {
    return null;
  }
  return (
    <Folding title="Gesetzesstand">
      <Container>
        <Line />
        {currentStatusHistory.map((state) => (
          <StateWrapper key={state}>
            <Icon currentStatus={currentStatus} state={state} />
            <State>{state}</State>
          </StateWrapper>
        ))}
      </Container>
    </Folding>
  );
};
