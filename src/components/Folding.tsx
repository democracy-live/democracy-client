import SvgArrow from 'assets/svgs/icons/Arrow';
import React, { useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { ListItemSeperator } from './ListItem/components/ListItemSeperator';

const Wrapper = styled.View`
  border-radius: 5px;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: ${({ theme }) => theme.paddings.outer};
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
`;

const Headline = styled.Text`
  flex: 1;
  font-size: 17px;
  margin-right: ${({ theme }) => theme.paddings.outer};
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface CollapseIconProps extends SvgProps {
  open: boolean;
}

const CollapseIcon = styled(SvgArrow).attrs(({ theme }) => ({
  color: theme.colors.secondaryText,
  width: 20,
  height: 20,
}))<CollapseIconProps>`
  align-self: flex-start;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Content = styled.View`
  padding-bottom: ${({ theme }) => theme.paddings.outer};
`;

interface Props {
  title: string | JSX.Element;
  opened?: boolean;
  disableCollapseing?: boolean;
}

const Folding: React.FC<Props> = ({
  title,
  opened = false,
  children,
  disableCollapseing = false,
}) => {
  const [open, setOpen] = useState(opened || disableCollapseing);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <Wrapper>
      <Header onPress={() => !disableCollapseing && setOpen(!open)}>
        <Headline>{title}</Headline>
        {!disableCollapseing && <CollapseIcon open={open} />}
      </Header>
      {open && (
        <>
          <ListItemSeperator />
          <Content>{children}</Content>
        </>
      )}
      <ListItemSeperator />
    </Wrapper>
  );
};

export default Folding;
