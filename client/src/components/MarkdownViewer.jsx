import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownViewer({ filePath }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    // Load the Markdown file content
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        setMarkdownContent(data);
      })
      .catch((error) => {
        console.error('Error while loading Markdown file:', error);
      });
  }, [filePath]);

  return (
    <div className="markdown-viewer"  >
      <ReactMarkdown style={{ zIndex: "100" }}>{markdownContent}</ReactMarkdown>
    </div>
  );
}

export default MarkdownViewer;
