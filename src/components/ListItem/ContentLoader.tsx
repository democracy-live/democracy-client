import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import styled, { useTheme } from 'styled-components/native';

const Wrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
  padding-vertical: ${({ theme }) => theme.paddings.outer};
  width: 100%;
  height: 110px;
`;

export const ListItemContentLoader = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <ContentLoader
        viewBox="0 0 380 70"
        animate
        backgroundColor={theme.colors.secondaryText}
        foregroundColor={theme.backgroundColor}
        opacity={0.5}>
        <Rect x="340" y="0" rx="3" ry="3" width="40" height="10" />
        <Circle cx="372" cy="30" r="8" />
        <Circle cx="352" cy="30" r="8" />
        <Rect x="340" y="60" rx="3" ry="3" width="40" height="10" />
        <Rect x="0" y="0" rx="4" ry="4" width="300" height="13" />
        <Rect x="0" y="17" rx="4" ry="4" width="230" height="13" />
        <Rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
        <Rect x="0" y="90" rx="3" ry="3" width="380" height="1" />
      </ContentLoader>
    </Wrapper>
  );
};
