import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 68px;
  background-color: rgba(68, 148, 211, 0.25);
  justify-content: center;
  align-items: center;
`;

const FillBox = styled.View<{ width: number }>`
  position: absolute;
  align-self: flex-start;
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: #4494d3;
`;

const Money = styled.Text`
  font-size: 17px;
`;

const Description = styled.Text`
  font-size: 13px;
  padding-top: 5px;
  color: #4f4f4b;
`; // color: rgb(0, 118, 255);

interface Props {
  target: number;
  occupied: number;
  style?: any;
  moneyTextStyle?: any;
  descriptionTextStyle?: any;
}

export const DonationBar: React.FC<Props> = ({
  target,
  occupied,
  style = {},
  moneyTextStyle = {},
  descriptionTextStyle = {},
}) => {
  return (
    <Wrapper style={style}>
      <FillBox width={(occupied / target) * 100} />
      <Money style={moneyTextStyle}>{`${
        target - occupied
      }€/Monat fehlen`}</Money>
      <Description style={descriptionTextStyle}>
        zur nachhaltigen Finanzierung
      </Description>
    </Wrapper>
  );
};
