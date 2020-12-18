import React from 'react';
import { DocumentItem } from './DocumentItem';
import styled from 'styled-components/native';
import {
  ImportantDocumentFragmentDoc,
  ImportantDocumentsFragment,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import Folding from 'components/Folding';

const Container = styled.View`
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
`;

interface Props extends ImportantDocumentsFragment {}

const Documents: React.FC<Props> = ({ importantDocuments }) => {
  return (
    <Folding title="Dokumente">
      <Container>
        {importantDocuments.map((doc) => (
          <DocumentItem
            key={doc.number}
            {...filter(ImportantDocumentFragmentDoc, doc)}
          />
        ))}
      </Container>
    </Folding>
  );
};

export default Documents;
