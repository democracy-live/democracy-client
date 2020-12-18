import React from 'react';
import styled from 'styled-components/native';
import { Text, Platform } from 'react-native';

const Wrapper = styled.View<{
  value: boolean | 'mixed';
  color?: string;
  disabledColor?: string;
}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ value, color, disabledColor }) =>
    value ? color : disabledColor};
  border-width: 1px;
  border-color: rgba(74, 74, 74, 0.2);
`;

const Checkmark = styled.View.attrs<{
  value: boolean | 'mixed';
  disabledColor?: string;
}>(({ value, disabledColor }) => ({
  color: value ? '#fff' : disabledColor,
  size: 40,
  backgroundColor: 'transparent',
  name: 'ios-checkmark',
}))<{ value: boolean | 'mixed'; disabledColor?: string }>`
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  padding-bottom: ${() => (Platform.OS === 'ios' ? 1 : 3)}px;
  padding-right: 1px;
`;

interface Props {
  value: boolean | 'mixed';
  color?: string;
  disabledColor?: string;
  disabledCheckmarkColor?: string;
}

const white = '#fff';

const Checkbox: React.FC<Props> = ({
  value,
  color = '#4494d3',
  disabledColor = '#fff',
  disabledCheckmarkColor = '#fff',
}) => (
  <Wrapper color={color} disabledColor={disabledColor} value={value}>
    <Checkmark value={value} disabledColor={disabledCheckmarkColor}>
      {value && <Text style={{ color: white }}>✓</Text>}
    </Checkmark>
  </Wrapper>
);

export default Checkbox;
