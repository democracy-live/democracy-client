import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'components/ListItem';
import {
  CommunityVotesPieChartFragmentDoc,
  GovernmentVotesPieChartFragmentDoc,
  ListItemFragmentDoc,
  Procedure,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CommunityPieChart } from './components/CommunityPieChart';
import { GovernmentPieChart } from './components/GovernmentPieChart';

export const ProcedureListItem: React.FC<Procedure> = React.memo((item) => {
  const navigation = useNavigation();
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
          />,
        ]}
      />
    </TouchableOpacity>
  );
});
