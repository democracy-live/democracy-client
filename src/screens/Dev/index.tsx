import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'components/Botton';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: blue;
`;

export const DevScreen: React.FC = () => {
  const [asyncStorageKeys, setAsyncStorageKeys] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then(setAsyncStorageKeys);
  }, []);

  const clearAsyncStorage = () => {
    AsyncStorage.clear();
  };

  const removeAsyncStorageEntry = (key: string) => () => {
    AsyncStorage.removeItem(key).then(() =>
      AsyncStorage.getAllKeys().then(setAsyncStorageKeys),
    );
  };

  const clearAuth = () => {
    AsyncStorage.multiRemove(['auth_token', 'auth_refreshToken']);
  };

  return (
    <Container>
      <Button
        onPress={clearAuth}
        text="clear Auth"
        textColor="white"
        backgroundColor="blue"
      />
      <Button
        onPress={clearAsyncStorage}
        text="clear AsyncStorage"
        textColor="white"
        backgroundColor="red"
      />
      {asyncStorageKeys.map((key) => (
        <Button
          key={key}
          onPress={removeAsyncStorageEntry(key)}
          text={`clear AsyncStorage (${key})`}
          textColor="white"
          backgroundColor="red"
        />
      ))}
    </Container>
  );
};
