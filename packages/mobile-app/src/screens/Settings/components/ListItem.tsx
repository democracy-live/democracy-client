import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  height: 44;
  align-items: center;
  padding-left: 16;
  border-bottom-width: 1;
  border-bottom-color: #c8c7cc;
  font-size: 17;
`;

const Value = styled.Text<{ arrow: boolean }>`
  font-size: 17;
  color: #8f8e94;
  padding-right: ${({ arrow }) => (arrow ? 5 : 12)};
`;

const Description = styled.Text`
  font-size: 13;
  color: #8f8e94;
  padding-horizontal: 18;
  padding-vertical: 8;
`;

// const NavigationIoniconsIcon = styled(Ionicons).attrs(() => ({
//   size: 24,
//   color: 'grey',
// }))`
//   text-align: center;
//   width: 24;
//   padding-right: 10;
//   margin-top: 3;
// `;

export interface Props {
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
}

export const ListItem: React.FC<Props> = ({
  children,
  text,
  arrow = false,
  onPress,
  component,
  description,
}) => {
  return (
    <>
      <Wrapper onPress={onPress}>
        {children}
        {!!text && <Value arrow={arrow}>{text}</Value>}
        {!!arrow && <Text>&gt;</Text>}
        {!!component && component}
      </Wrapper>
      {!!description && <Description>{description}</Description>}
    </>
  );
};
