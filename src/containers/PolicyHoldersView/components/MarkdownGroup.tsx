import React from 'react';
import { Box } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import { ctaSummary, development, features } from '../markdown';

function MarkdownGroup() {
  return (
    <Box textAlign="left" marginTop={2}>
      <ReactMarkdown>{ctaSummary}</ReactMarkdown>
      <ReactMarkdown>{features}</ReactMarkdown>
      <ReactMarkdown>{development}</ReactMarkdown>
    </Box>
  );
}

export default MarkdownGroup;
