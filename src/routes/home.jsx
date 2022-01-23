import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const { API_URL } = process.env;

export default function HomeComponent() {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!content) {
      fetch(`${API_URL}/pages/`)
        .then((response) => response.json())
        .then((pages) => setContent(pages[0].markdown));
    }
  });

  return (
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  );
}
