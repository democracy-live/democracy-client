import React from 'react';
import styled from 'styled-components/native';

const SegmentWrapper = styled.View`
  padding-vertical: 5px;
  padding-horizontal: 18px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.header};
  align-items: center;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface Props {
  text: string;
}

export const Segment: React.FC<Props> = ({ text }) => (
  <SegmentWrapper>
    <Text>{text}</Text>
  </SegmentWrapper>
);
