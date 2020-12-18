import React, { createContext, useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { NOTIFICATION_SETTINGS } from './graphql/query/NotificationSettings';
import {
  NotificationSettings_notificationSettings,
  NotificationSettings,
} from './graphql/query/__generated__/NotificationSettings';
import {
  UpdateNotificationSettings,
  UpdateNotificationSettingsVariables,
} from './graphql/mutation/__generated__/UpdateNotificationSettings';
import { UPDATE_NOTIFICATION_SETTINGS } from './graphql/mutation/UpdateNotificationSettings';
import { ExecutionResult } from 'graphql';
import { Platform } from 'react-native';
import {
  AddToken,
  AddTokenVariables,
} from './graphql/mutation/__generated__/AddToken';
import { ADD_TOKEN } from './graphql/mutation/AddToken';
import AsyncStorage from '@react-native-community/async-storage';
import { checkNotifications } from 'react-native-permissions';
import useAppState from 'react-native-appstate-hook';
import PushNotification from 'react-native-push-notification';

interface NotificationsInterface {
  hasPermissions: boolean;
  alreadyDenied: boolean;
  outcomePushsDenied: boolean;
  notificationSettings: Pick<
    NotificationSettings_notificationSettings,
    | 'conferenceWeekPushs'
    | 'enabled'
    | 'voteConferenceWeekPushs'
    | 'voteTOP100Pushs'
    | 'outcomePushs'
  >;
  update: (
    options: UpdateNotificationSettingsVariables,
  ) => Promise<ExecutionResult<UpdateNotificationSettings>> | void;
  requestToken: () => void;
  setOutcomePushsDenied: (value: boolean) => void;
}

const defaults: NotificationsInterface = {
  hasPermissions: false,
  alreadyDenied: false,
  outcomePushsDenied: false,
  notificationSettings: {
    conferenceWeekPushs: false,
    enabled: false,
    voteConferenceWeekPushs: false,
    voteTOP100Pushs: false,
    outcomePushs: false,
  },
  update: () => {
    throw new Error('NotificationsContext: update function is not defined');
  },
  requestToken: () => {
    throw new Error(
      'NotificationsContext: requestToken function is not defined',
    );
  },
  setOutcomePushsDenied: () => {
    throw new Error(
      'NotificationsContext: setOutcomePushsDenied function is not defined',
    );
  },
};

export const NotificationsContext = createContext<NotificationsInterface>(
  defaults,
);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [hasPermissions, setHasPermissions] = useState(defaults.hasPermissions);
  const [alreadyDenied, setAlreadyDenied] = useState(false);
  const [outcomePushsDenied, setOutcomePushsDenied] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationsInterface['notificationSettings']
  >(defaults.notificationSettings);
  const { data } = useQuery<NotificationSettings>(NOTIFICATION_SETTINGS);

  const [updateSettings] = useMutation<
    UpdateNotificationSettings,
    UpdateNotificationSettingsVariables
  >(UPDATE_NOTIFICATION_SETTINGS);
  const [sendToken] = useMutation<AddToken, AddTokenVariables>(ADD_TOKEN);

  const { appState } = useAppState({});

  useEffect(() => {
    checkNotifications().then(({ status }) => {
      if (!alreadyDenied && status === 'blocked') {
        setAlreadyDenied(true);
        setHasPermissions(false);
      } else if (status === 'granted') {
        setAlreadyDenied(false);
        setHasPermissions(true);
      }
    });
  }, [appState, alreadyDenied]);

  useEffect(() => {
    AsyncStorage.getItem('PUSH_OUTCOME_DENIED').then((value) => {
      if (value) {
        setOutcomePushsDenied(true);
      }
    });
  }, []);

  useEffect(() => {
    if (outcomePushsDenied) {
      AsyncStorage.setItem('PUSH_OUTCOME_DENIED', 'true');
    }
  }, [outcomePushsDenied]);

  useEffect(() => {
    if (data && data.notificationSettings) {
      setNotificationSettings(data.notificationSettings);
    }
  }, [data]);

  // register notification events
  useEffect(() => {
    PushNotification.configure({
      onRegister: ({ token, os }) => {
        AsyncStorage.setItem('push-token', token);
        sendToken({
          variables: {
            os,
            token,
          },
        });
        setHasPermissions(true);
      },
      requestPermissions: false,
    });
    // Notifications.isRegisteredForRemoteNotifications().then((value) => {
    //   setHasPermissions(value);
    // });
  }, [sendToken]);

  // resend token when neccessary
  useEffect(() => {
    if (Platform.OS === 'ios' && hasPermissions) {
      AsyncStorage.getItem('push-token').then(
        (token) => !token && requestToken(),
      );
    }
  }, [hasPermissions]);

  const requestToken = () => {
    PushNotification.requestPermissions();
  };

  const update = (options: UpdateNotificationSettingsVariables) => {
    if (options) {
      return updateSettings({
        variables: options,
        refetchQueries: [
          {
            query: NOTIFICATION_SETTINGS,
          },
        ],
        update: (proxy, { data: updateData }) => {
          if (updateData && updateData.updateNotificationSettings) {
            const notificationCacheData = proxy.readQuery<NotificationSettings>(
              {
                query: NOTIFICATION_SETTINGS,
              },
            );
            if (notificationCacheData) {
              proxy.writeQuery<NotificationSettings>({
                query: NOTIFICATION_SETTINGS,
                data: {
                  ...notificationCacheData,
                  ...options,
                },
              });
            }
          }
        },
      });
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        hasPermissions,
        alreadyDenied,
        notificationSettings,
        update,
        requestToken,
        outcomePushsDenied,
        setOutcomePushsDenied,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};
