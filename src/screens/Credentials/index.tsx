import { CompositeNavigationProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import SvgMail from 'assets/svgs/icons/Mail';
import SvgPhone from 'assets/svgs/icons/Phone';
import SvgPlanet from 'assets/svgs/icons/Planet';
import Folding from 'components/Folding';
import { MadeWithLove } from 'components/MadeWithLove';
import deepmerge from 'deepmerge';
import { linking } from 'lib/linking';
import { RootStackParamList } from 'navigation';
import { SidebarNavigatorParamList } from 'navigation/Sidebar';
import React, { ComponentProps } from 'react';
import { Linking, Platform } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
import styled, { useTheme } from 'styled-components/native';
import { credentialsData } from './data';

const phoneNumber =
  Platform.OS === 'ios'
    ? `telprompt:${'+4917647040213'}`
    : `tel:${'+4917647040213'}`;
const email = `mailto:${'contact@democracy-deutschland.de'}`;
const website = 'https://www.democracy-deutschland.de/';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const ContactWrapper = styled.View`
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300px;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-width: 2px;
  border-radius: 33px;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.secondaryText};
`;

const Spacer = styled.View`
  padding-bottom: 36px;
`;

const FoldingContent = styled.View`
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {} }) => {
  const theme = useTheme();
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: theme.colors.secondaryText,
        ...(styles.paragraph || []),
      },
      listItemUnorderedContent: {
        color: theme.colors.secondaryText,
        ...(styles.listItemUnorderedContent || []),
      },
      listItemBullet: {
        color: theme.colors.secondaryText,
        ...(styles.listItemBullet || []),
      },
      link: {
        color: theme.colors.primaryColoredText,
        ...(styles.link || []),
      },
    },
    styles,
  );

  return (
    <FoldingContent>
      <MarkdownView
        styles={markdownStyles}
        onLinkPress={(url: string) => {
          Linking.openURL(url).catch((error) =>
            console.warn('An error occurred: ', error),
          );
        }}>
        {children}
      </MarkdownView>
    </FoldingContent>
  );
};

type CredentialsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarNavigatorParamList, 'Credentials'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: CredentialsScreenNavigationProp;
};

export const CredentialsScreen: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      {credentialsData.map(({ title, text, opened }) => (
        <Folding title={title} key={title} opened={opened}>
          <Markdown>{text}</Markdown>
        </Folding>
      ))}
      <Spacer />
      <ContactWrapper>
        <IconWrapper onPress={linking(phoneNumber)}>
          <SvgPhone color={theme.colors.secondaryText} width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(email)}>
          <SvgMail color={theme.colors.secondaryText} width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(website)}>
          <SvgPlanet
            color={theme.colors.secondaryText}
            width={30}
            height={30}
          />
        </IconWrapper>
      </ContactWrapper>
      <Spacer />
      <MadeWithLove />
    </Wrapper>
  );
};
