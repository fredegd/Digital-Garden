import React from "react";

import ReactMarkdown from 'react-markdown';

import { Box } from "@mui/material";

export default function BlogItem({blog}) {
  console.log(blog.title)
  return (
<>


<ReactMarkdown style={{ zIndex: "100" }}>{blog.title}</ReactMarkdown>
<ReactMarkdown style={{ zIndex: "100" }}>{blog.content}</ReactMarkdown>

</>

  )
  
  
}
