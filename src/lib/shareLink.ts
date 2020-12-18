import DeviceInfo from 'react-native-device-info';
import speakingurl from 'speakingurl';

export const getShareLink = ({
  type,
  procedureId,
  title,
}: {
  type: string;
  procedureId: string;
  title: string;
}): string => {
  let domain = '';
  switch (DeviceInfo.getBundleId()) {
    case 'de.democracy-deutschland.clientapp.internal':
    case 'de.democracydeutschland.app.internal':
      domain = 'https://internal.democracy-app.de';
      break;

    case 'de.democracy-deutschland.clientapp.alpha':
    case 'de.democracydeutschland.app.alpha':
      domain = 'https://alpha.democracy-app.de';
      break;
    case 'de.democracy-deutschland.clientapp.beta':
    case 'de.democracydeutschland.app.beta':
      domain = 'https://beta.democracy-app.de';
      break;
    default:
      domain = 'https://democracy-app.de';
      break;
  }

  return `${domain}/${type.toLowerCase()}/${procedureId}/${speakingurl(title)}`;
};
