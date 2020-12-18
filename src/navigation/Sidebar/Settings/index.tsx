import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarNavigatorParamList } from '..';
import { RootStackParamList } from 'navigation';
import SvgMenu from 'assets/svgs/icons/Menu';
import { useTheme } from 'styled-components/native';
import { BurgerMenuButton } from 'components/navigation/MenuButton';
import { Settings } from 'screens/Settings';
import { SyncVotes } from 'screens/Settings/SyncVotes';
import { CaptureSyncVotes } from 'screens/Settings/SyncVotes/Capture';
import { ConstituencyScreen } from 'screens/Settings/Constituency';
import { VerificationNavigation } from 'navigation/verification';

export type SettingsRootStackParamList = {
  Settings: undefined;
  SyncVotes: undefined;
  SyncVotesCapture: undefined;
  Constituency: { goBack?: boolean };
  Verification: undefined;
};

const SettingsRootStack = createStackNavigator<SettingsRootStackParamList>();

type SettingsNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarNavigatorParamList, 'Settings'>,
  StackNavigationProp<RootStackParamList>
>;

export const SettingsRootNavigation = () => {
  const navigation = useNavigation<SettingsNavigationProps>();
  const theme = useTheme();
  return (
    <SettingsRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.primaryText,
      }}>
      <SettingsRootStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.colors.header,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton
              onPress={navigation.toggleDrawer}
              testID="BurgerMenuButton">
              <SvgMenu width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
      <SettingsRootStack.Screen
        name="SyncVotes"
        component={SyncVotes}
        options={{
          headerTitle: 'Stimmen übertragen',
        }}
      />
      <SettingsRootStack.Screen
        name="SyncVotesCapture"
        component={CaptureSyncVotes}
        options={{
          headerTitle: 'Stimmen empfangen',
        }}
      />
      <SettingsRootStack.Screen
        name="Constituency"
        component={ConstituencyScreen}
        options={{
          title: 'Wahlkreissuche',
        }}
      />
      <SettingsRootStack.Screen
        name="Verification"
        component={VerificationNavigation}
        options={{ headerShown: false }}
      />
    </SettingsRootStack.Navigator>
  );
};
