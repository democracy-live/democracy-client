import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  opacity: 0.3;
`;

export const ListItemSeperator = () => {
  return <View />;
};
