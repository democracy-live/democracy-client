import React from 'react';
import styled from 'styled-components/native';

const LockText = styled.Text`
  font-size: 60px;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 200;
`;

export const LockIcon = () => {
  return <LockText>?</LockText>;
};
