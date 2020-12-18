import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { DonationBar } from './DonationBar';
import { useNavigation } from '@react-navigation/native';
import { SidebarNavigationProps } from '../..';

const DonateBoxWrapper = styled.View`
  height: 68px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const DonationTouch = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 68px;
`;

const DonationBarBox = styled(DonationBar).attrs({
  style: { backgroundColor: '#4494d390' },
  descriptionTextStyle: { color: '#fff' },
  moneyTextStyle: { color: '#fff' },
})``;

export const DonationBox: React.FC = () => {
  const navigation = useNavigation<SidebarNavigationProps>();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch('https://www.democracy-deutschland.de/api.php?call=donation_status')
      .then((response) => response.json())
      .then((json) => setData(json.result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading || !data) {
    return null;
  }
  return (
    <DonateBoxWrapper>
      <DonationTouch onPress={() => navigation.navigate('Donate')}>
        <DonationBarBox
          target={data.donation_value_goal}
          occupied={data.donation_value}
        />
      </DonationTouch>
    </DonateBoxWrapper>
  );
};
