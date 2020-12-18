import React from 'react';

// components
import Constituency from './Constituency';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { RootStackParamList } from 'navigation';
import { ButtonNext, Space } from 'screens/Verification';
import { PieChart } from 'screens/Procedure/components/PieChart';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { WahlOMeterStackParamList } from 'navigation/Sidebar/WahlOMeter';

const Wrapper = styled.View<Pick<Props, 'noButton'>>`
  align-items: center;
  /* justify-content: space-around; */
  min-height: ${({ noButton }) => (noButton ? 200 : 300)}px;
  /* flex: 1; */
`;

const ImageWrapper = styled.View``;

const PieChartWrapper = styled.View`
  position: absolute;
  right: 18px;
  bottom: 0;
  width: 100px;
`;

const Text = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
  padding-horizontal: 18px;
`;

const TextBold = styled.Text`
  color: #000;
`;

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<WahlOMeterStackParamList, 'Constituency'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  noButton?: boolean;
}

export const VoteVarificationNoConstituency: React.FC<Props> = ({
  noButton,
}) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const randomMainValue = Math.random() * (1 - 0.7);
  const randomSecondValue = Math.min(
    ...[Math.random() * (1 - randomMainValue), 0.2],
  );

  const pieChartData = [
    { percent: randomMainValue, color: '#59BC6D', label: 'Zustimmungen' },
    { percent: randomSecondValue, color: '#4183DD', label: 'Enthaltungen' },
    {
      percent: 1 - randomMainValue - randomSecondValue,
      color: '#DB4D3C',
      label: 'Ablehnungen',
    },
  ];

  const navigateToSelectConstituency = () => {
    navigation.navigate('Constituency', {
      goBack: true,
    });
  };

  const votesData = pieChartData.reduce((prev, { label, percent }) => {
    return { ...prev, [label]: percent };
  }, {});

  return (
    <Wrapper noButton={noButton}>
      <Space />
      <ImageWrapper>
        <Constituency width={249} height={155} />
        <PieChartWrapper>
          <PieChart
            votesData={votesData}
            colors={pieChartData.map(({ color }) => color)}
            innerTextBottom=""
            innerTextTop=""
            size={100}
            total={2}
            hidePercentage
          />
        </PieChartWrapper>
      </ImageWrapper>
      <Space />
      <Text>
        Ab sofort können mit DEMOCRACY auch{' '}
        <TextBold>Wahlkreis-Community-Ergebnisse</TextBold> ermittelt werden.
        Mach mit und inspiriere Deinen Abgeordneten noch direkter!
      </Text>
      <Space />
      {!noButton && (
        <ButtonNext
          style={{ alignSelf: 'stretch' }}
          text={'Wahlkreis einstellen'.toUpperCase()}
          textColor="white"
          backgroundColor="blue"
          onPress={navigateToSelectConstituency}
        />
      )}
    </Wrapper>
  );
};
