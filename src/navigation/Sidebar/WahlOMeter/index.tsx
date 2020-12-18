import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import TabView from './TabView';
import { VoteSelection } from 'generated/graphql';
import { getHeaderScreenOptions } from 'navigation/headerOptions';
import { BurgerMenuButton } from 'components/navigation/MenuButton';
import SvgMenu from 'assets/svgs/icons/Menu';
import { ProcedureDetailScreen } from 'screens/Procedure';
import { VotingScreen } from 'screens/Voting';
import { SidebarNavigatorParamList } from '..';
import { RootStackParamList } from 'navigation';
import { ConstituencyScreen } from 'screens/Settings/Constituency';
import { OutcomePushs } from 'screens/Voting/OutcomePushs';
import styled from 'styled-components/native';
import { MemberProfil } from 'screens/WahlOMeter/MemberProfil';

export type WahlOMeterStackParamList = {
  TabView: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
    procedureId: string;
    procedureObjId: string;
  };
  MemberProfil: undefined;
  Constituency: { goBack?: boolean };
  OutcomePush: { finishAction: () => void; title: string; procedureId: string };
};

const WahlOMeterStack = createStackNavigator<WahlOMeterStackParamList>();

type WahlOMeterNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarNavigatorParamList, 'WahlOMeter'>,
  StackNavigationProp<RootStackParamList>
>;

const Navigator = styled(WahlOMeterStack.Navigator).attrs(({ theme }) => ({
  screenOptions: {
    ...getHeaderScreenOptions(theme),
  },
}))``;

export const WahlOMeterNavigation = () => {
  const navigation = useNavigation<WahlOMeterNavigationProps>();
  return (
    <Navigator>
      <WahlOMeterStack.Screen
        name="TabView"
        component={TabView}
        options={{
          title: 'Wahl-O-Meter',
          headerLeft: () => (
            <BurgerMenuButton
              onPress={navigation.toggleDrawer}
              testID="BurgerMenuButton">
              <SvgMenu width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
      <WahlOMeterStack.Screen
        name="Procedure"
        component={ProcedureDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <WahlOMeterStack.Screen
        name="Voting"
        component={VotingScreen}
        options={{
          title: 'Wahlurne',
        }}
      />
      <WahlOMeterStack.Screen
        name="Constituency"
        component={ConstituencyScreen}
        options={{
          title: 'Wahlkreissuche',
        }}
      />
      <WahlOMeterStack.Screen name="OutcomePush" component={OutcomePushs} />
      <WahlOMeterStack.Screen
        name="MemberProfil"
        component={MemberProfil}
        options={{
          title: '',
        }}
      />
    </Navigator>
  );
};
