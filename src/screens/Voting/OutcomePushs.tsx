import React, { useState, useContext } from 'react';
import { useRoute, RouteProp } from '@react-navigation/core';
import { Dimensions, Switch, View } from 'react-native';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import styled from 'styled-components/native';
import {
  ProcedureDetailDocument,
  useToggleNotificationMutation,
} from 'generated/graphql';
import { NotificationsContext } from 'context/NotificationPermission';
import { defaultNotificationData } from 'assets/data/defaultNotificationData';
import SvgNewmarker from 'assets/svgs/icons/Newmarker';
import SvgIconappios from 'assets/svgs/icons/IconAppIos';
import { NotificationBox } from 'components/NotificationBox';
import { Button } from 'components/Botton';

const DEVICE_WIDTH = Dimensions.get('window').width;

type RoutePropOP = RouteProp<BundestagStackNavigatorParamList, 'OutcomePush'>;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    marginHorizontal: 18,
  },
})``;

const Headline = styled.Text`
  color: #000;
  font-size: 25px;
  margin-vertical: 18px;
`;

const Subtitle = styled.Text`
  color: #9b9b9b;
  font-size: 15px;
  margin-top: 18px;
  margin-bottom: 18px;
  text-align: center;
`;

const SwitchWrapper = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18px;
`;

const SwitchText = styled.Text`
  font-size: 17px;
  flex: 1;
  padding-right: 18px;
`;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

interface Props {
  finishAction: () => void;
}

export const OutcomePushs: React.FC<Props> = ({ finishAction }) => {
  const route = useRoute<RoutePropOP>();

  const [toggleNotification] = useToggleNotificationMutation({
    variables: {
      procedureId: route.params.procedureId,
    },
    refetchQueries: [
      {
        query: ProcedureDetailDocument,
        variables: {
          id: route.params.procedureId,
        },
      },
    ],
  });

  const [pushActive, setPushActive] = useState(true);
  const {
    requestToken,
    update: updateNotificationSettings,
    setOutcomePushsDenied,
  } = useContext(NotificationsContext);

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: route.params.title || defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const doneAction = route.params.finishAction
    ? route.params.finishAction
    : finishAction;

  const pressActivate = () => {
    toggleNotification();
    requestToken();
    updateNotificationSettings({
      enabled: true,
      outcomePushs: true,
    });
    doneAction();
  };

  const pressDenie = () => {
    setOutcomePushsDenied(true);
    doneAction();
  };

  return (
    <ScrollView>
      <View style={{ paddingTop: 36, alignItems: 'center' }}>
        <SvgNewmarker
          width={58}
          height={35}
          color="#f568c4"
          style={{ position: 'absolute', left: 0, top: 36 }}
        />
        <SvgIconappios width={73} height={73} />
        <Headline>Ergebnisse erhalten</Headline>
        <Subtitle>
          Werde nach Deiner Abstimmung automatisch über das offizielle Ergebnis
          des Bundestages informiert, sobald dieses vorliegt, um es mit Deinem
          vergleichen zu können.
        </Subtitle>
      </View>
      <NotificationBox
        icon={require('assets/images/icon.logo.png')}
        owner="DEMOCRACY"
        title={notification.title}
        text={notification.text}
      />
      <SwitchWrapper>
        <SwitchText>Bundestagsergebnisse immer automatisch erhalten</SwitchText>
        <Switch value={pushActive} onValueChange={setPushActive} />
      </SwitchWrapper>
      {pushActive && (
        <Button
          style={{
            marginHorizontal: 18,
            width: DEVICE_WIDTH - 36,
          }}
          backgroundColor="blue"
          textColor="white"
          text="Aktivieren"
          onPress={pressActivate}
        />
      )}
      {!pushActive && (
        <Button
          style={{
            marginHorizontal: 18,
            width: DEVICE_WIDTH - 36,
          }}
          backgroundColor="red"
          textColor="white"
          text="Nicht mehr anzeigen"
          onPress={pressDenie}
        />
      )}

      {!pushActive && (
        <Subtitle>
          Du kannst die Benachrichtigungen jederzeit in den App-Einstellungen
          aktivieren
        </Subtitle>
      )}

      {pushActive && (
        <Button textColor="blue" text="Überspringen" onPress={doneAction} />
      )}
    </ScrollView>
  );
};
