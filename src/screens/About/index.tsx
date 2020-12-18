import { DrawerNavigationProp } from '@react-navigation/drawer';
import SvgDemocracyBubble from 'assets/svgs/icons/DemocracyBubble';
import { MadeWithLove } from 'components/MadeWithLove';
import deepmerge from 'deepmerge';
import { SidebarNavigatorParamList } from 'navigation/Sidebar';
import React, { ComponentProps } from 'react';
import { Linking } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { MarkdownView } from 'react-native-markdown-view';
import { Space } from 'screens/Verification';
import styled, { useTheme } from 'styled-components/native';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Content = styled.View`
  padding-horizontal: 18px;
`;

const HeaderWrapper = styled.View`
  padding-vertical: 18px;
  align-items: center;
`;

const QuotWrapper = styled.View`
  flex-direction: row;
`;

const Quot = styled.Text`
  font-size: 100px;
  color: ${({ theme }) => theme.colors.header};
  top: -18px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
  style?: ComponentProps<typeof MarkdownView>['style'];
}

const Markdown: React.FC<MarkdownProps> = ({
  children,
  styles = {},
  style = {},
}) => {
  const theme = useTheme();
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: theme.colors.secondaryText,
        ...(styles.paragraph || []),
      },
      link: {
        color: theme.colors.primaryColoredText,
        ...(styles.link || []),
      },
    },
    styles,
  );

  return (
    <MarkdownView
      styles={markdownStyles}
      style={style}
      onLinkPress={(url: string) => {
        Linking.openURL(url).catch((error) =>
          console.warn('An error occurred: ', error),
        );
      }}>
      {children}
    </MarkdownView>
  );
};

type AboutScreenNavigationProp = DrawerNavigationProp<
  SidebarNavigatorParamList,
  'About'
>;

type Props = {
  navigation: AboutScreenNavigationProp;
};

export const AboutScreen: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <SvgDemocracyBubble width="125" height="125" color="#000" />
          <Text
            style={{
              paddingTop: 18,
            }}>
            Version {getVersion()} ({getBuildNumber()})
          </Text>
          <Text>Made with ❤ by DEMOCRACY Deutschland e.V.</Text>
        </HeaderWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}>
          {`[DEMOCRACY Deutschland e.V.](https://www.democracy-deutschland.de) ist ein gemeinnütziger Verein, der mit seiner gleichnamigen App _DEMOCRACY_ Demokratie direkter und repräsentativer machen will. 

Als crowd-finanzierte und politisch unabhängige Plattform informiert die App über die aktuellen Bundestagsabstimmungen und ermöglicht den Nutzern eine eigene direkte Abstimmung.        
`}
        </Markdown>
        <QuotWrapper>
          <Quot>❝</Quot>
          <Markdown
            style={{
              paddingRight: 100,
            }}
            styles={{
              paragraph: {
                fontSize: 15,
              },
            }}>
            {`Mit DEMOCRACY wollen wir eine öffentliche Infrastruktur zur Verfügung stellen, die das Funktionieren einer lebendigen Demokratie begünstigt.

Der Weisheit letzter Schluss liegt für uns in der solidarischen Kooperation (Gemeinschaftlichkeit) zum Vorteil aller (Gemeinnützigkeit). 

Deshalb ist es für uns selbstverständlich, nicht nur alle Abstimmungsergebnisse anonymisiert, sondern auch unseren Source-Code offen zu legen (Transparenz). 

Und weil Profitinteressen die Idee nur korrumpieren würden, haben wir uns auch äußerlich eine Rechtsform gegeben, die eine Verfremdung oder Bereicherungsabsicht per Satzung für immer ausschließt. 

DEMOCRACY ist und bleibt spendenfinanziert. 

Alle entstehenden Nutzerdaten sind gerade keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Datenverkauf und Werbefinanzierung finden bei unserem Vorhaben keinen Platz.

_Marius Krüger im September 2017_
`}
          </Markdown>
        </QuotWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}>
          {`Nach wie vor gilt unser größter Dank den 542 Unterstützerinnen und Unterstützern unserer initialen [Crowdfunding-Kampagne](https://www.startnext.com/democracy), ohne die es nicht möglich gewesen wäre, DEMOCRACY überhaupt umzusetzen.

Neben den initialen Projektunterstützungen ziehen wir unseren Hut vor den zahlreichen [Paten und Patinnen](https://www.democracy-deutschland.de/#!donate), die mit ihrer regelmäßigen Spende mithelfen, die kühne Vision einer unabhängigen und nachhaltigen Crowdfinanzierung von DEMOCRACY bereits jetzt zu realisieren.
 
Unsere Arbeit ist und bleibt unabhängig, überparteilich, allgemeinnützig und nicht-kommerziell – von Menschen für Menschen.

Für mehr Informationen:
[democracy-deutschland.de](https://www.democracy-deutschland.de)
`}
        </Markdown>
        <Space />
      </Content>
      <MadeWithLove />
    </Wrapper>
  );
};
