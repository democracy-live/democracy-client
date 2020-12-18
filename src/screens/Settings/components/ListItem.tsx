import SvgArrow from 'assets/svgs/icons/Arrow';
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  align-items: center;
  padding-left: 16px;
  padding-right: 18px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.womCharts.notMatching};
  font-size: 17px;
`;

const Value = styled.Text<{ arrow: boolean }>`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.secondaryText};
  padding-right: ${({ arrow }) => (arrow ? 5 : 12)}px;
`;

const Description = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondaryText};
  padding-horizontal: 18px;
  padding-vertical: 8px;
`;

const Arrow = styled(SvgArrow).attrs(() => ({
  color: 'rgba(180, 180, 180, 0.5)',
  width: 17,
  height: 17,
}))`
  transform: rotate(90deg);
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

interface Props {
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
  testID?: string;
}

export const ListItem: React.FC<Props> = ({
  children,
  text,
  arrow = false,
  onPress,
  component,
  description,
  testID,
}) => {
  return (
    <>
      <Wrapper onPress={onPress} testID={testID}>
        {children}
        {!!text && <Value arrow={arrow}>{text}</Value>}
        {!!arrow && <Arrow />}
        {!!component && component}
      </Wrapper>
      {!!description && <Description>{description}</Description>}
    </>
  );
};
