import { Linking, Alert } from 'react-native';

export const linking = (url: string) => () => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url).catch(() => null);
    } else {
      Alert.alert(
        'Nicht unterstützt',
        'Diese Operation wird auf Deinem Gerät zurzeit nicht unterstützt!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
  });
};
