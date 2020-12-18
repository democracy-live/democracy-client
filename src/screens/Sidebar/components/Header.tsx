import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { HeadLogo } from './HeadLogo';
import { ConstituencyContext } from 'context/constituency';
import { getConstituencySvg } from '../../../assets/svgs/constituencies';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from 'context/Auth';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16px;
  padding-left: 16px;
  padding-bottom: 8px;
`;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17px;
  padding-left: 16px;
`;

type NavigationProp = StackNavigationProp<RootStackParamList, 'Sidebar'>;

interface Props {}

export const Header: React.FC<Props> = ({}) => {
  const navigation = useNavigation<NavigationProp>();
  const { isVerified, loading } = useContext(AuthContext);
  const { constituency } = useContext(ConstituencyContext);
  const onPress = () => {
    navigation.navigate('Verification');
  };
  const label: string = isVerified ? 'verifizierter Nutzer' : 'verifizieren';

  const getConstituency = (wk: string) => {
    const DynComp = getConstituencySvg(wk);
    return (
      <DynComp.default
        width={60}
        height={50}
        childProps={{ fill: '#fff', stroke: '#4494d344', strokeWidth: '2%' }}
      />
    );
  };

  if (loading) {
    return (
      <Container onPress={() => {}}>
        <HeadLogo />
        <HeadTextWrapper>
          <HeadText>verbindet…</HeadText>
        </HeadTextWrapper>
      </Container>
    );
  }
  return (
    <Container onPress={onPress}>
      {!!constituency && getConstituency(constituency)}
      <HeadTextWrapper>
        <HeadText>{label}</HeadText>
        {!!constituency && <HeadText>Wahlkreis {constituency}</HeadText>}
      </HeadTextWrapper>
    </Container>
  );
};
