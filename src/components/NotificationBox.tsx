import SvgIconappios from 'assets/svgs/icons/IconAppIos';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  icon?: ImageSourcePropType;
  owner?: string;
  title: string;
  text?: string;
}

const Wrapper = styled.View`
  width: 100%;
  background-color: #0007;
  padding-horizontal: 11px;
  padding-top: 11px;
  padding-bottom: 18px;
  border-radius: 12px;
`;

const Head = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Owner = styled.Text`
  font-size: 15px;
  padding-left: 8px;
  color: #fff;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

const Text = styled.Text`
  padding-top: 3px;
  font-size: 15px;
  color: #fff;
`;

export const NotificationBox: React.FC<Props> = ({
  title,
  text,
  icon,
  owner,
}) => {
  return (
    <Wrapper>
      {(!!icon || !!owner) && (
        <Head>
          <SvgIconappios width={20} height={20} />
          {!!owner && <Owner>{owner}</Owner>}
        </Head>
      )}
      <Title>{title}</Title>
      {!!text && <Text>{text}</Text>}
    </Wrapper>
  );
};
