import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import { ProcedureList } from 'screens/ProcedureList';
import { ListType } from 'generated/graphql';

export type BundestagTabNavigatorParamList = {
  Sitzungswoche: { list: ListType };
  Vergangen: { list: ListType };
  Top: { list: ListType };
};

const Tab = createMaterialTopTabNavigator<BundestagTabNavigatorParamList>();

const Navigator = styled(Tab.Navigator).attrs(({ theme }) => ({
  tabBarOptions: {
    scrollEnabled: false,
    indicatorStyle: {
      backgroundColor: theme.colors.white,
    },
    activeTintColor: theme.colors.white,
    inactiveTintColor: theme.colors.white,
    style: {
      backgroundColor: theme.colors.header,
    },
    labelStyle: {
      fontSize: 12,
    },
  },
}))``;

export const BundestagTabNavigator: React.FC = () => {
  return (
    <Navigator lazy={true}>
      <Tab.Screen
        name="Sitzungswoche"
        component={ProcedureList}
        options={{
          title: 'Sitzungs\u200Bwoche',
        }}
        initialParams={{ list: ListType.ConferenceweeksPlanned }}
      />
      <Tab.Screen
        name="Vergangen"
        component={ProcedureList}
        initialParams={{ list: ListType.Past }}
      />
      <Tab.Screen
        name="Top"
        component={ProcedureList}
        options={{
          title: 'TOP 100',
        }}
        initialParams={{ list: ListType.Top100 }}
      />
    </Navigator>
  );
};
