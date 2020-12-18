import React, { FC } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Slide } from '../data';

const ContainerImages = styled.View`
  flex: 1;
  max-width: 600px;
  align-items: center;
  width: 100%;
`;

const ContainerCenterImage = styled.View``;

const ImageTranspContainer = styled.View`
  position: absolute;
  border-radius: 40px;
`;

const ImageTranspContainerLeft = styled(ImageTranspContainer)`
  align-self: flex-start;
`;

const ImageTranspContainerRight = styled(ImageTranspContainer)`
  align-self: flex-end;
`;

const ImageLeft = styled.Image`
  opacity: 0.4;
  margin-top: 50px;
`;

const ImageRight = styled.Image`
  opacity: 0.4;
  margin-top: 50px;
`;

const ImageCenter = styled.Image``;

const ButtonVerify = styled.TouchableOpacity`
  bottom: 175px;
  background-color: rgb(126, 211, 33);
  border-radius: 8px;
  width: 180px;
  height: 41px;
  position: absolute;
`;

const TextVerify = styled.Text`
  color: #fff;
  font-size: 22px;
  text-align: center;
  padding-top: 6px;
`;

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [`${theme.backgroundColor}0`, theme.backgroundColor],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 0.9 },
}))`
  width: 100%;
  height: 50px;
`;

interface Props extends Pick<Slide, 'images' | 'verify'> {}

export const ScreensImages: FC<Props> = ({ images, verify }) => {
  return (
    <ContainerImages>
      {images.left && (
        <ImageTranspContainerLeft>
          <ImageLeft source={images.left} />
        </ImageTranspContainerLeft>
      )}
      {images.right && (
        <ImageTranspContainerRight>
          <ImageRight source={images.right} />
        </ImageTranspContainerRight>
      )}
      <ContainerCenterImage>
        <ImageCenter source={images.center} />
        {verify && (
          <ButtonVerify onPress={verify}>
            <TextVerify>Verifizieren</TextVerify>
          </ButtonVerify>
        )}
      </ContainerCenterImage>
      <Gradient>
        <></>
      </Gradient>
    </ContainerImages>
  );
};
