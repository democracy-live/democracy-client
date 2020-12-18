/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import DrawerItemList from './DrawerItemList';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp, DrawerItem } from '@react-navigation/drawer';
import { RootStackParamList } from '../../navigation';
import { SidebarNavigatorParamList } from '../../navigation/Sidebar';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { rateApp } from '../../lib/rateApp';
import { DonationBox } from './components/Donation';

export type SidebarNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Sidebar'>,
  DrawerNavigationProp<SidebarNavigatorParamList>
>;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const RateBoxWrapper = styled.View``;

const NaviList = styled.ScrollView`
  margin-bottom: 68px;
`;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const SidebarScreen: React.FC<Props> = (props) => {
  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header />
        <NaviList>
          <DrawerItemList {...props} />
        </NaviList>
      </SafeAreaView>
      <RateBoxWrapper>
        <DrawerItem
          label="⭐️  App Bewerten"
          onPress={rateApp}
          labelStyle={{ fontSize: 16, color: '#ddd' }}
        />
      </RateBoxWrapper>
      <DonationBox />
    </Container>
  );
};
