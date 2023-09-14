import React from "react";
import MarkdownViewer from "./MarkdownViewer";
import { Box } from "@mui/material";

export default function BlogItem() {
  return <MarkdownViewer filePath={"./src/assets/form-data.md"} />;
}
