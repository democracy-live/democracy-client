import React from 'react';
import styled from 'styled-components/native';

const Box = styled.View`
  width: 100%;
  border-radius: 6px;
  border-color: #ced1d2;
  /* padding-top: 18; */
`;

const Text = styled.Text`
  padding-vertical: 9px;
  padding-horizontal: 9px;
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  font-size: 17px;
`;

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => (
  <Box>
    <Text>{text}</Text>
  </Box>
);

export default Description;
