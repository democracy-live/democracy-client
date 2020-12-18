import React from 'react';
import m from 'moment';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { ProcedureDetailsFragment } from 'generated/graphql';

const Wrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
  padding-vertical: ${({ theme }) => theme.paddings.outer};
`;

const Head = styled.View`
  flex-direction: row;
`;

const HeadLeft = styled.View`
  flex: 1;
`;

const HeadRight = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HeadRightTitle = styled.View`
  flex: 1;
`;

const HeadRightDescr = styled.View`
  padding-left: 8px;
`;

const DefTitle = styled.Text`
  font-size: 14px;
  /* color: rgba(68, 148, 211, 0.9); */
  color: ${({ theme }) => theme.colors.primaryColoredText};
`;

const DefTitleSeperated = styled(DefTitle)`
  padding-top: ${({ theme }) => theme.paddings.outer};
`;

const DefTitleRight = styled(DefTitle)`
  text-align: right;
`;

const DefDescr = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Content = styled.View`
  padding-top: 11px;
`;

const ContentText = styled(DefDescr)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const renderType = (type: string) => {
  switch (type) {
    case 'Gesetzgebung':
      return 'Gesetz';
    default:
      return type;
  }
};

interface Props extends ProcedureDetailsFragment {}

export const ProcedureDetails: React.FC<Props> = ({
  subjectGroups,
  submissionDate,
  voteDate,
  abstract,
  procedureId,
  currentStatus,
  type,
}) => {
  return (
    <Wrapper>
      <Head>
        {subjectGroups && subjectGroups.length > 0 && (
          <HeadLeft>
            <DefTitle>Sachgebiete</DefTitle>
            <DefDescr>{subjectGroups.join('\n')}</DefDescr>
          </HeadLeft>
        )}
        <HeadRight>
          <HeadRightTitle>
            <DefTitleRight>Typ</DefTitleRight>
            <DefTitleRight>Vorgang</DefTitleRight>
            <DefTitleRight>erstellt am</DefTitleRight>

            {voteDate && <DefTitleRight>Abstimmung</DefTitleRight>}
          </HeadRightTitle>
          <HeadRightDescr>
            {type && <DefDescr>{renderType(type)}</DefDescr>}
            <DefDescr selectable={true}>{procedureId}</DefDescr>
            <DefDescr>
              {submissionDate && m(submissionDate).format('DD.MM.YY')}
            </DefDescr>
            {voteDate && <DefDescr>{m(voteDate).format('DD.MM.YY')}</DefDescr>}
          </HeadRightDescr>
        </HeadRight>
      </Head>

      <DefTitleSeperated>Aktueller Stand</DefTitleSeperated>
      <DefDescr>{currentStatus}</DefDescr>
      <Content>
        {abstract && (
          <View>
            <DefTitle>Inhalt</DefTitle>
            <ContentText selectable={true}>{abstract}</ContentText>
          </View>
        )}
      </Content>
    </Wrapper>
  );
};
