import React, { useContext, ReactNode } from 'react';
import { SectionList, Switch, Button, Linking, Alert } from 'react-native';

// GraphQL
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem } from './components/ListItem';
import { useNavigation } from '@react-navigation/core';
import { getBundleId } from 'react-native-device-info';
import styled from 'styled-components/native';
import { SettingsRootStackParamList } from 'navigation/Sidebar/Settings';
import { AuthContext } from 'context/Auth';
import { ConstituencyContext } from 'context/constituency';
import { NotificationsContext } from 'context/NotificationPermission';
import { Segment } from 'components/Segment';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.backgroundColor};
  flex: 1;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 17px;
  margin-right: auto;
`;

type FilterScreenNavigationProp = StackNavigationProp<
  SettingsRootStackParamList,
  'Settings'
>;

interface ListData {
  title: string;
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
  testID?: string;
}

interface List {
  title: string;
  data: ListData[];
}

type Props = {};

export const Settings: React.FC<Props> = () => {
  const navigation = useNavigation<FilterScreenNavigationProp>();
  const { constituency } = useContext(ConstituencyContext);
  const { isVerified } = useContext(AuthContext);
  const {
    hasPermissions,
    alreadyDenied,
    notificationSettings,
    update: updateNotificationSettings,
    requestToken,
  } = useContext(NotificationsContext);

  const navigateTo = (screen: string) => () => {
    switch (screen) {
      case 'constituency':
        navigation.navigate('Constituency', {});
        break;
      case 'verificate':
        navigation.navigate('Verification');
        break;
      case 'SyncVotes':
        navigation.navigate('SyncVotes');
        break;

      default:
        break;
    }
  };

  const handleActivate = () => {
    if (!alreadyDenied) {
      requestToken();
    } else {
      Alert.alert(
        'Benachrichtigungen',
        'Bitte Mitteilungen in den Einstellungen aktivieren.',
        [
          {
            text: 'Aktivieren',
            onPress: () =>
              Linking.openURL(`app-settings://notification/${getBundleId}`),
          },
          {
            text: 'Später',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const listData: List[] = [
    {
      title: '',
      data: [
        {
          title: 'Status',
          text:
            isVerified === true
              ? 'Verifiziert'
              : isVerified === false
              ? 'Verifizieren'
              : '…',
          arrow: isVerified === false,
          onPress:
            isVerified === false ? navigateTo('verificate') : () => undefined,
          testID: isVerified === false ? 'Verifizieren' : 'Verifiziert',
        },
        {
          title: 'Wahlkreis',
          text: `WK ${constituency}`,
          onPress: navigateTo('constituency'),
          arrow: true,
        },
        {
          title: 'Stimmen übertragen',
          onPress: navigateTo('SyncVotes'),
          arrow: true,
        },
      ],
    },
  ];

  listData[0].data.push({
    title: 'Benachrichtigungen',
    onPress: navigateTo('notifications-settings'),
    component: hasPermissions ? (
      <Switch
        value={!!notificationSettings.enabled}
        onValueChange={(value) => {
          updateNotificationSettings({
            enabled: value,
          });
        }}
      />
    ) : (
      <Button title="Aktivieren" onPress={handleActivate} />
    ),
  });

  if (hasPermissions && notificationSettings.enabled) {
    listData.push(
      {
        title: 'Individuelle Benachrichtungen',
        data: [
          {
            title: 'Bundestagsergebnisse',
            onPress: navigateTo('notifications-settings'),
            component: (
              <Switch
                testID="outcomePushsSwitch"
                value={!!notificationSettings.outcomePushs}
                onValueChange={(value) => {
                  updateNotificationSettings({
                    outcomePushs: value,
                  });
                }}
              />
            ),
            description: isVerified
              ? 'Werde nach Deiner Abstimmung standardmäßig über das offizielle Ergebnis des Bundestages informiert, sobald dieses vorliegt.'
              : 'Werde über das offizielle Ergebnis des Bundestages informiert, sobald dieses vorliegt.',
          },
        ],
      },
      {
        title: 'Sitzungswoche',
        data: [
          {
            title: 'Ankündigung',
            onPress: navigateTo('notifications-settings'),
            component: (
              <Switch
                value={!!notificationSettings.conferenceWeekPushs}
                onValueChange={(value) => {
                  updateNotificationSettings({
                    conferenceWeekPushs: value,
                  });
                }}
              />
            ),
            description:
              'Werde Sonntags vor einer Sitzungswoche über die kommenden Abstimmungen informiert.',
          },
        ],
      },
    );
  }

  if (isVerified && notificationSettings.enabled) {
    const tmp = listData.find(({ title }) => title === 'Sitzungswoche');
    if (tmp) {
      tmp.data.push({
        title: 'Wichtige Abstimmungen',
        onPress: navigateTo('notifications-settings'),
        component: (
          <Switch
            value={!!notificationSettings.voteConferenceWeekPushs}
            onValueChange={(value) => {
              updateNotificationSettings({
                voteConferenceWeekPushs: value,
              });
            }}
          />
        ),
        description:
          'Werde täglich während einer laufenden Sitzungswoche, über eine populäre Abstimmung informiert.',
      });
    }
    listData.push({
      title: 'Sitzungsfreie Zeit',
      data: [
        {
          title: 'Populäre Abstimmungen',
          onPress: navigateTo('notifications-settings'),
          component: (
            <Switch
              value={!!notificationSettings.voteTOP100Pushs}
              onValueChange={(value) => {
                updateNotificationSettings({
                  voteTOP100Pushs: value,
                });
              }}
            />
          ),
          description:
            'Challenge? Werde auch in der sitzungsfreien Zeit täglich über eine Abstimmung informiert, bei der Du noch nicht mitgemacht hast.',
        },
      ],
    });
  }

  return (
    <Wrapper>
      <SectionList<ListData>
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            text={item.text}
            description={item.description}
            arrow={item.arrow}
            onPress={item.onPress}
            component={item.component}
            testID={item.testID}>
            <Text>{item.title}</Text>
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Segment text={title} />
        )}
        sections={listData}
        keyExtractor={(item) => item.title}
      />
    </Wrapper>
  );
};
