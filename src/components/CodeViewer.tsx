import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';

interface Props {
  code: string;
  language?: string;
}

const SyntaxHighlighterContainer = styled(SyntaxHighlighter)`
  max-height: 320px;
  padding: 15px 20px !important;
`;

const CodeViewer: React.FC<Props> = ({ code, language = 'javascript' }) => {
  return (
    <SyntaxHighlighterContainer language={language} style={github}>
      {code}
    </SyntaxHighlighterContainer>
  );
};

export default CodeViewer;
