import { ImageSourcePropType } from 'react-native';

export interface Slide {
  head: {
    image: ImageSourcePropType;
    title: string;
    description: string;
  };
  images: {
    left?: ImageSourcePropType;
    center: ImageSourcePropType;
    right?: ImageSourcePropType;
    circle?: ImageSourcePropType;
  };
  isNew?: boolean;
  verify?: () => void;
}

type ScreenData = Slide[];

export const slidesData: ScreenData = [
  {
    head: {
      image: require('./assets/icon.vergleiche.png'),
      title: 'Wähle',
      description: '…einen offiziellen Vorgang des Deutschen Bundestages',
    },
    images: {
      center: require('./assets/screen.waehle.png'),
      right: require('./assets/screen.stimme.png'),
    },
    isNew: true,
  },
  {
    head: {
      image: require('./assets/icon.stimme.png'),
      title: 'Stimme',
      description:
        '…selbst über den Vorgang ab, als wärst Du Bundestagsabgeordneter',
    },
    images: {
      center: require('./assets/screen.stimme.png'),
      left: require('./assets/screen.waehle.png'),
      right: require('./assets/screen.vergleiche.png'),
    },
  },
  {
    head: {
      image: require('./assets/icon.beobachte.png'),
      title: 'Vergleiche',
      description:
        '…Dein Abstimmungsverhalten mit der Community und dem Bundestag',
    },
    images: {
      center: require('./assets/screen.vergleiche.png'),
      left: require('./assets/screen.waehle.png'),
      right: require('./assets/screen.analysiere.png'),
    },
  },
  {
    head: {
      image: require('./assets/icon.analyse.png'),
      title: 'Analysiere',
      description: '…Deine Übereinstimmungen mit den Parteien und Kandidaten',
    },
    images: {
      center: require('./assets/screen.analysiere.png'),
      left: require('./assets/screen.vergleiche.png'),
    },
  },
];
