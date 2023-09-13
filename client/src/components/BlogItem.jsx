import React from 'react'
import MarkdownViewer from './MarkdownViewer';


export default function BlogItem() {
    return (
        <div className="blog">
          Converted:
          <MarkdownViewer filePath={"./src/assets/form-data.md"} />
        </div>
      );
}
