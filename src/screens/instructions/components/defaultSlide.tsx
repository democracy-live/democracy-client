import React, { FC } from 'react';
import { Slide } from '../data';
import { NewMarker } from './newMarker';
import styled from 'styled-components/native';
import { ScreensImages } from './screensImages';

interface Props extends Slide {}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: 18px;
`;

const HeadImage = styled.Image`
  tint-color: ${({ theme }) => theme.primaryColor};
`;

const TextHead = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 22px;
  padding-top: 15px;
  text-align: center;
`;

const TextSub = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 15px;
  padding-top: 3px;
  margin-bottom: 18px;
  text-align: center;
`;

export const DefaultSlide: FC<Props> = ({ isNew, head, images, verify }) => {
  return (
    <Container>
      {isNew && <NewMarker />}
      <HeadImage source={head.image} />
      <TextHead>{head.title}</TextHead>
      <TextSub>{head.description}</TextSub>
      <ScreensImages images={images} verify={verify} />
    </Container>
  );
};
