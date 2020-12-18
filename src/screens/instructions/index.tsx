import React, { FC } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { slidesData, Slide } from './data';
import { DefaultSlide } from './components/defaultSlide';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

interface Props {
  onDone: () => void;
}

const BottomButtonWrapper = styled.View`
  flex-direction: row;
  margin-horizontal: 24px;
`;

const Button = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 18px;
  padding-vertical: 12px;
`;

export const InstructionsScreen: FC<Props> = ({ onDone }) => {
  const _renderItem = ({ item }: { item: Slide }) => {
    return (
      <Container>
        <DefaultSlide {...item} />
      </Container>
    );
  };
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slidesData}
      keyExtractor={(item) => item.head.title}
      // eslint-disable-next-line react-native/no-inline-styles
      activeDotStyle={{ backgroundColor: 'rgba(125, 125, 125, .9)' }}
      // eslint-disable-next-line react-native/no-inline-styles
      dotStyle={{ backgroundColor: 'rgba(125, 125, 125, .5)' }}
      onDone={onDone}
      renderNextButton={() => (
        <BottomButtonWrapper>
          <Button>Weiter</Button>
        </BottomButtonWrapper>
      )}
      renderDoneButton={() => (
        <BottomButtonWrapper>
          <Button>Fertig</Button>
        </BottomButtonWrapper>
      )}
    />
  );
};
