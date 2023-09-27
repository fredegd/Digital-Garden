import { motion, useScroll } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/material/styles";
import { axiosClient } from "../axiosClient";
import {client} from "../client";
import { Box } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const [blogItemDetail, setBlogItemDetail] = useState({});
  const { blogItemid } = useParams();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    client
      .getEntry(blogItemid)
      .then((response) => {
        console.log(response.fields, 'testtt');
        setBlog(response.fields);
        console.log(response.fields)
        if (response.fields.images) {
          console.log(response.fields.images);
          setBlogImgs(response.fields.images);
        }
      })
      .catch((err) => console.log(err));
    
  }, []);

  

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      // Add more renderNode functions as needed for other block types
    },
    renderMark: {},
    renderInline: {},
  };
  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

   console.log(blog&& blog.title,  blog && blog.blogTitleImage);
  // console.log(blog.content.length);
 // const title = blog.fields.title;
  // blog.title.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title;
const content =      blog&&  renderRichText(blog.content)



 // console.log(blogItemDetail.title);

  return (
    <Box
      sx={{
        marginTop: "5rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: "15rem",
          left: 0,
          right: 0,
          height: "1rem",
          transformOrigin: "0%",
        }}
      />
      <Box
        sx={{
          zIndex: "1000",
          background:  
          `linear-gradient(90deg, ${theme.palette.background.transparent} 0%, ${theme.palette.background.secondary} 50%, ${theme.palette.background.transparent} 100%)`
          // theme.palette.background.transparent ,

        }}
      >
      {blog&&
      <Box>
      <h1>{blog.title}</h1>
        
      </Box>
      }  
      </Box>
    </Box>
  );
}
