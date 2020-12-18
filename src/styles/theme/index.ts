import { Appearance } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

interface FractionColor {
  background: string;
  text: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    colors: {
      header: string;
      white: string;
      primaryText: string;
      secondaryText: string;
      primaryColoredText: string;
      communityVotes: {
        voted: {
          yes: string;
          abstination: string;
          no: string;
        };
        notVoted: {
          yes: string;
          abstination: string;
          no: string;
        };
      };
      governmentVotes: {
        yes: string;
        abstination: string;
        no: string;
        notVoted: string;
      };
      womCharts: {
        matching: string;
        notMatching: string;
      };
      charts: {
        piePercentage: string;
      };
      date: {
        soon: string;
        current: string;
        past: string;
      };
      fractions: {
        Union: FractionColor;
        SPD: FractionColor;
        AfD: FractionColor;
        FDP: FractionColor;
        Linke: FractionColor;
        Grüne: FractionColor;
        fraktionslos: FractionColor;
      };
    };
    paddings: {
      outer: string;
    };
  }
}

const paddings: DefaultTheme['paddings'] = {
  outer: '11px',
};

export const lightTheme: DefaultTheme = {
  primaryColor: '#333',
  secondaryColor: '#666',
  backgroundColor: '#fff',
  colors: {
    header: '#4494d3',
    white: '#fff',
    primaryText: '#333',
    secondaryText: '#8f8e94',
    primaryColoredText: '#4494d3',
    communityVotes: {
      voted: {
        yes: '#59BC6C',
        abstination: '#4183DD',
        no: '#DA4C3D',
      },
      notVoted: {
        yes: '#C7C7CC',
        abstination: '#D8D8D8',
        no: '#B0AFB7',
      },
    },
    governmentVotes: {
      yes: '#8CBA39',
      abstination: '#46A0C3',
      no: '#D43194',
      notVoted: '#9FA2A3',
    },
    womCharts: {
      matching: '#E8A945',
      notMatching: '#B0B4B5',
    },
    charts: {
      piePercentage: '#fff',
    },
    date: {
      soon: '#59BC6C',
      current: '#F5A623',
      past: '#DA4C3D',
    },
    fractions: {
      Union: {
        background: '#32302e',
        text: '#dad9d4',
      },
      SPD: {
        background: '#E3000F',
        text: '#fff',
      },
      AfD: {
        background: '#009ee0',
        text: '#fff',
      },
      FDP: {
        background: '#ffed00',
        text: '#e5007d',
      },
      Linke: {
        background: '#CE2C55',
        text: '#fff',
      },
      Grüne: {
        background: '#46962b',
        text: '#fff',
      },
      fraktionslos: {
        background: '#aaa',
        text: 'white',
      },
    },
  },
  paddings,
};

export const darkTheme: DefaultTheme = {
  primaryColor: '#fff',
  secondaryColor: '#cacaca',
  backgroundColor: '#333',
  colors: {
    header: '#224b6b',
    white: '#fffb',
    primaryText: '#fffd',
    secondaryText: '#fff8',
    primaryColoredText: '#4494d3bb',
    communityVotes: {
      voted: {
        yes: '#59BC6Caa',
        abstination: '#4183DDaa',
        no: '#DA4C3Daa',
      },
      notVoted: {
        yes: '#C7C7CCaa',
        abstination: '#D8D8D8aa',
        no: '#B0AFB7aa',
      },
    },
    governmentVotes: {
      yes: '#8CBA39aa',
      abstination: '#46A0C3aa',
      no: '#D43194aa',
      notVoted: '#9FA2A3aa',
    },
    womCharts: {
      matching: '#E8A945',
      notMatching: '#B0B4B5',
    },
    charts: {
      piePercentage: '#fffb',
    },
    date: {
      soon: '#59BC6Caa',
      current: '#F5A623aa',
      past: '#DA4C3Daa',
    },
    fractions: {
      Union: {
        background: '#000000aa',
        text: '#fffb',
      },
      SPD: {
        background: '#E3000Faa',
        text: '#fffb',
      },
      AfD: {
        background: '#009ee0aa',
        text: '#fffb',
      },
      FDP: {
        background: '#ffed00aa',
        text: '#e5007dbb',
      },
      Linke: {
        background: '#CE2C55aa',
        text: '#fffb',
      },
      Grüne: {
        background: '#46962baa',
        text: '#fffb',
      },
      fraktionslos: {
        background: '#aaab',
        text: '#ffffffbb',
      },
    },
  },
  paddings,
};

export const getTheme = () =>
  Appearance.getColorScheme() === 'light' ? lightTheme : darkTheme;
