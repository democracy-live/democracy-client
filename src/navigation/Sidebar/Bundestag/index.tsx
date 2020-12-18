import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BundestagTabNavigator } from './TabNavigation';
import styled from 'styled-components/native';
import { ProcedureDetailScreen } from 'screens/Procedure';
import { VoteSelection } from 'generated/graphql';
import { VotingScreen } from 'screens/Voting';
import { BurgerMenuButton } from 'components/navigation/MenuButton';
import SvgMenu from 'assets/svgs/icons/Menu';
import { DrawerActions } from '@react-navigation/native';
import { getHeaderScreenOptions } from 'navigation/headerOptions';
import { BundestagRightHeader } from './Header/Right';
import { FilterScreen } from 'screens/Filter';
import { ListFilterProvider } from 'context/ListFilter';
import { SearchScreen } from 'screens/Search';
import { OutcomePushs } from 'screens/Voting/OutcomePushs';
import { ConstituencyScreen } from 'screens/Settings/Constituency';
import { MemberProfil } from 'screens/WahlOMeter/MemberProfil';

export type BundestagStackNavigatorParamList = {
  TabNavigator: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.Abstination | VoteSelection.No;
    procedureId: string;
    title: string;
  };
  Filter: undefined;
  Search: undefined;
  MemberProfil: undefined;
  OutcomePush: { finishAction: () => void; title: string; procedureId: string };
  Constituency: { goBack?: boolean };
};

const Stack = createStackNavigator<BundestagStackNavigatorParamList>();

const Navigator = styled(Stack.Navigator).attrs(({ theme }) => ({
  screenOptions: {
    ...getHeaderScreenOptions(theme),
  },
}))``;

export const BundestagStackNavigator: React.FC = () => {
  return (
    <ListFilterProvider>
      <Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={BundestagTabNavigator}
          options={({ navigation }) => ({
            title: 'Bundestag',
            headerLeft: () => (
              <BurgerMenuButton
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }>
                <SvgMenu width={18} height={18} color="#fff" />
              </BurgerMenuButton>
            ),
            headerRight: () => <BundestagRightHeader />,
          })}
        />
        <Stack.Screen name="Procedure" component={ProcedureDetailScreen} />
        <Stack.Screen name="Voting" component={VotingScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="OutcomePush" component={OutcomePushs} />
        <Stack.Screen
          name="Constituency"
          component={ConstituencyScreen}
          options={{
            title: 'Wahlkreissuche',
          }}
        />
        <Stack.Screen
          name="MemberProfil"
          component={MemberProfil}
          options={{
            title: '',
          }}
        />
      </Navigator>
    </ListFilterProvider>
  );
};
