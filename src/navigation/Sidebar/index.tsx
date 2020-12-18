import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GovernmentIcon from 'screens/Sidebar/components/icons/Government';
import { SidebarScreen } from 'screens/Sidebar';
import { BundestagStackNavigator } from './Bundestag';
import SvgSettings from 'assets/svgs/icons/Settings';
import { SettingsRootNavigation } from './Settings';
import SvgFaqAndSupport from 'assets/svgs/icons/FaqAndSupport';
import { FaqScreen } from 'screens/Faq';
import { getHeaderScreenOptions } from 'navigation/headerOptions';
import SvgAbout from 'assets/svgs/icons/About';
import { AboutScreen } from 'screens/About';
import SvgLaw from 'assets/svgs/icons/Law';
import { CredentialsScreen } from 'screens/Credentials';
import SvgWahlOMeter from 'assets/svgs/icons/WahlOMeter';
import { WahlOMeterNavigation } from './WahlOMeter';
import { DevScreen } from 'screens/Dev';
import styled from 'styled-components/native';
import { DonateScreen } from 'screens/Donate';

export type SidebarNavigatorParamList = {
  Home: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Donate: undefined;
  Faq: undefined;
  About: undefined;
  Credentials: undefined;
  Dev: undefined;
};

const Drawer = createDrawerNavigator<SidebarNavigatorParamList>();

const Navigator = styled(Drawer.Navigator).attrs(({ theme }) => ({
  screenOptions: {
    ...getHeaderScreenOptions(theme),
  },
}))``;

export const Sidebar: React.FC = () => {
  return (
    <Navigator
      drawerContent={(props: any) => <SidebarScreen {...props} />}
      drawerType={'back'}
      overlayColor="1"
      drawerContentOptions={{
        labelStyle: { color: '#fff' },
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: 'rgba(68, 148, 211, 0.5)',
      }}>
      <Drawer.Screen
        name="Home"
        component={BundestagStackNavigator}
        options={{
          drawerLabel: '/Bundestag',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <GovernmentIcon width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Auswertungen/Wahl-O-Meter',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Mehr/Settings',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgSettings width={size} height={size} color={color} />
          ),
        }}
        name="Settings"
        component={SettingsRootNavigation}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: 'FAQ',
          drawerLabel: 'Mehr/FAQ & Support',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={'Faq'}
        component={FaqScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgAbout width={size} height={size} color={color} />
          ),
        }}
        name={'About'}
        component={AboutScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          drawerLabel: 'Mehr/Rechtliches',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgLaw width={size} height={size} color={color} />
          ),
        }}
        name={'Credentials'}
        component={CredentialsScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          drawerLabel: 'hide/Donate',
          gestureEnabled: true,
        }}
        name={'Donate'}
        component={DonateScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          drawerLabel: 'Dev/Dev',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgLaw width={size} height={size} color={color} />
          ),
        }}
        name={'Dev'}
        component={DevScreen}
      />
    </Navigator>
  );
};
