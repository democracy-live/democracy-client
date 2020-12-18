import {
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
  ListItemFragmentDoc,
  Procedure,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import React from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';
import { CommunityPieChart } from 'screens/ProcedureList/components/CommunityPieChart';
import { GovernmentPieChart } from 'screens/ProcedureList/components/GovernmentPieChart';
import { ListItem } from '../../../components/ListItem';

interface Props {
  navigation: any;
}

export const renderItem: ({
  navigation,
}: Props) => ListRenderItem<Procedure> = ({ navigation }) => ({ item }) => {
  return (
    <TouchableOpacity
      key={item.procedureId}
      onPress={() =>
        navigation.navigate('Procedure', {
          procedureId: item.procedureId,
          title: item.title,
        })
      }>
      <ListItem
        {...filter(ListItemFragmentDoc, item)}
        renderPieCharts={[
          <GovernmentPieChart
            key={`government-piechart-${item.procedureId}`}
            {...filter(GovernmentVotesPieChartFragmentDoc, item)}
          />,
          <CommunityPieChart
            key={`community-piechart-${item.procedureId}`}
            {...filter(CommunityVotesPieChartFragmentDoc, item)}
            selectionFull
          />,
        ]}
      />
    </TouchableOpacity>
  );
};
