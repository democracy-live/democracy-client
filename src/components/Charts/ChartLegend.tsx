import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const VoteResultsWrapper = styled.View`
  align-items: center;
`;

const VoteResultNumbers = styled.View`
  width: ${() => Dimensions.get('window').width - 18 * 2}px;
  max-width: 464px;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 18px;
  height: 40px;
`;

const VoteResult = styled.View`
  justify-content: center;
  align-items: center;
`;

const VoteResultCircleNumber = styled.View`
  flex-direction: row;
`;

const VoteResultNumber = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
  padding-top: 1px;
`;
const VoteResultLabel = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
  padding-top: 6px;
`;

const VoteResultCircle = styled.View<{ color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  margin-top: 3px;
  margin-right: 5px;
`;

export interface ChartLegendData {
  label: string;
  value: number | null;
  color: string;
}

interface Props {
  data: ChartLegendData[];
}

export const ChartLegend: React.FC<Props> = ({ data }) => {
  return (
    <VoteResultsWrapper>
      <VoteResultNumbers>
        {data.map(({ label, value, color }) => (
          <VoteResult key={label}>
            <VoteResultCircleNumber>
              <VoteResultCircle color={color} />
              <VoteResultNumber>{value}</VoteResultNumber>
            </VoteResultCircleNumber>
            <VoteResultLabel>{label}</VoteResultLabel>
          </VoteResult>
        ))}
      </VoteResultNumbers>
    </VoteResultsWrapper>
  );
};
