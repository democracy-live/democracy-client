import Folding from 'components/Folding';
import { CommunityVoteResultsFragment } from 'generated/graphql';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { PieChart } from '../PieChart';
import Carousel from 'pinar';
import { getConstituencySvg } from 'assets/svgs/constituencies';
import GermanySvgComponent from 'assets/svgs/GermanySVG';
import { View, useWindowDimensions } from 'react-native';
import { ChartLegend, ChartLegendData } from 'components/Charts/ChartLegend';
import { CountryMap } from './CountryMap';
import { scaleLinear } from 'd3';
import { ConstituencyContext } from 'context/constituency';

const Container = styled(Carousel).attrs(({ theme }) => ({
  activeDotStyle: {
    backgroundColor: theme.colors.primaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  dotsContainerStyle: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: theme.colors.secondaryText,
    width: 8,
    height: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
}))``;

const Description = styled.Text`
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
`;

interface Props extends CommunityVoteResultsFragment {}

export const CommuntiyVoteResults: React.FC<Props> = ({
  procedureId,
  communityVotes,
  voted,
}) => {
  const theme = useContext(ThemeContext);
  const { constituency } = useContext(ConstituencyContext);
  const { width } = useWindowDimensions();

  const { voted: votedColors } = theme.colors.communityVotes;

  const colorRange = [votedColors.yes, votedColors.abstination, votedColors.no];

  if (communityVotes?.total === undefined) {
    return null;
  }

  const votesData = communityVotes
    ? {
        yes: communityVotes.yes,
        abstination: communityVotes.abstination,
        no: communityVotes.no,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
      };

  const userConstituency =
    constituency && communityVotes
      ? communityVotes.constituencies.find(
          (c) => c.constituency === constituency,
        )
      : undefined;

  const votesDataConstituency = userConstituency
    ? {
        yes: userConstituency.yes,
        abstination: userConstituency.abstination,
        no: userConstituency.no,
      }
    : {
        yes: 0,
        abstination: 0,
        no: 0,
      };

  const colorGenerator = scaleLinear()
    .domain([-1, 0, 1])
    .range([
      (theme.colors.communityVotes.voted.no as unknown) as number,
      (theme.colors.communityVotes.voted.abstination as unknown) as number,
      (theme.colors.communityVotes.voted.yes as unknown) as number,
    ]);

  const charts: any[] = [];
  if (communityVotes) {
    const legendData: ChartLegendData[] = [
      {
        label: 'Zustimmungen',
        value: votesData.yes,
        color: colorRange[0],
      },
      {
        label: 'Enthaltungen',
        value: votesData.abstination,
        color: colorRange[1],
      },
      {
        label: 'Ablehnungen',
        value: votesData.no,
        color: colorRange[2],
      },
    ];

    const countryTotal = communityVotes.total;
    const countryYesNoValue = (votesData.yes - votesData.no) / countryTotal;
    const countryAbstinationValue = votesData.abstination / countryTotal / 2;
    const countryColorValue =
      countryYesNoValue === 0
        ? 0
        : countryYesNoValue > 0
        ? countryYesNoValue - countryAbstinationValue
        : countryYesNoValue + countryAbstinationValue;

    charts.push(
      <View key="communityChart">
        <PieChart
          topLeftText="Bundesweit"
          innerTextBottom="Abstimmende"
          innerTextTop={`${communityVotes.total}`}
          votesData={votesData}
          colors={colorRange}
          size={width}
          total={communityVotes.total}
          topRightSvg={
            <GermanySvgComponent
              width={60}
              height={50}
              childProps={{
                fill: `${colorGenerator(countryColorValue)}`,
              }}
            />
          }
        />
        <ChartLegend data={legendData} />
      </View>,
    );

    charts.push(<CountryMap key="countryMap" procedureId={procedureId} />);
  }

  if (userConstituency) {
    const DynComp = getConstituencySvg(userConstituency.constituency);
    const legendData: ChartLegendData[] = [
      {
        label: 'Zustimmungen',
        value: votesDataConstituency.yes,
        color: colorRange[0],
      },
      {
        label: 'Enthaltungen',
        value: votesDataConstituency.abstination,
        color: colorRange[1],
      },
      {
        label: 'Ablehnungen',
        value: votesDataConstituency.no,
        color: colorRange[2],
      },
    ];

    const constituencyTotal = userConstituency.total;
    const constituencyYesNoValue =
      (votesDataConstituency.yes - votesDataConstituency.no) /
      constituencyTotal;
    const constituencyAbstinationValue =
      votesDataConstituency.abstination / constituencyTotal / 2;
    const constituencyColorValue =
      constituencyYesNoValue === 0
        ? 0
        : constituencyYesNoValue > 0
        ? constituencyYesNoValue - constituencyAbstinationValue
        : constituencyYesNoValue + constituencyAbstinationValue;

    charts.push(
      <View key="communityConstituencyChart">
        <PieChart
          topLeftText={`Wahlkreis ${userConstituency.constituency}`}
          colors={colorRange}
          innerTextBottom="Abstimmende"
          innerTextTop={`${userConstituency.total}`}
          total={userConstituency.total}
          votesData={votesDataConstituency}
          size={width}
          topRightSvg={
            <DynComp.default
              width={60}
              height={50}
              childProps={{
                fill: `${colorGenerator(constituencyColorValue)}`,
              }}
            />
          }
        />
        <ChartLegend data={legendData} />
      </View>,
    );
  }
  return (
    <Folding title="Communityergebis" opened={voted}>
      <Container showsControls={false} style={{ height: width + 30 }}>
        {charts}
      </Container>
      <Description>
        Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft
      </Description>
    </Folding>
  );
};
