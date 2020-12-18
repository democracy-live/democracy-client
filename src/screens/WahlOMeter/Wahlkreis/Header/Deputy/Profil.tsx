import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

// Components
import { ScreenNavigationProp } from 'navigation/Sidebar/WahlOMeter/TabView';
import { useNavigation } from '@react-navigation/native';
import { ProfilFragment } from 'generated/graphql';
import { PartyLogo } from 'components/Parties';
import SvgInfo from 'assets/svgs/icons/Info';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const MemberImageWrapper = styled.TouchableOpacity`
  width: 200px;
  height: 275px;
  align-items: center;
  padding-bottom: 8px;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 175px;
  width: 200px;
  border-radius: 100px;
  border-width: ${() => (Platform.OS === 'ios' ? '1px' : 0)};
  border-color: lightgray;
`;

const Party = styled(PartyLogo)`
  position: absolute;
  right: 0;
  bottom: 30px;
`;

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled(SvgInfo).attrs(() => ({
  width: 18,
  height: 18,
  color: 'rgb(199, 199, 204)',
}))`
  margin-left: ${({ theme }) => theme.paddings.outer};
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20px;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextLighGrey = styled(Text)`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const ChartWrapper = styled.View`
  align-items: center;
`;

interface Props extends ProfilFragment {}

export const DeputyProfile: React.FC<Props> = ({
  imgURL,
  name,
  party,
  constituency,
}) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <Wrapper>
      <ChartWrapper>
        <MemberImageWrapper onPress={() => navigation.navigate('MemberProfil')}>
          <MemberImage source={{ uri: imgURL }} />
          <Party party={party} />
        </MemberImageWrapper>
        <DeputyDetailsWrapper>
          <NameWrapper>
            <Text>{name}</Text>
            <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
          </NameWrapper>
          <InfoIconButton onPress={() => navigation.navigate('MemberProfil')}>
            <InfoIcon />
          </InfoIconButton>
        </DeputyDetailsWrapper>
      </ChartWrapper>
    </Wrapper>
  );
};
