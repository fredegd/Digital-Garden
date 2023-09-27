import { motion, useScroll } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/material/styles";
import { client } from "../client";
import { Box, Typography, IconButton } from "@mui/material";
import {KeyboardArrowUp} from "@mui/icons-material";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export default function BlogItem() {
  const theme = useTheme();
  const [blog, setBlog] = useState();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { blogItemid } = useParams();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    client
      .getEntry(blogItemid)
      .then((response) => {
        // console.log(response.fields, "testtt");
        setBlog(response.fields);
        // console.log(response.fields);
        if (response.fields.images) {
          console.log(response.fields.images);
          setBlogImgs(response.fields.images);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        // Show the button when scrolling down 200px
        setShowBackToTop(true);
      } else {
        // Hide the button when scrolling back to the top
        setShowBackToTop(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!blog) {
    console.log("done");
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          padding: "2rem",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            zIndex: "1000",
            width: "100%",
            background: `linear-gradient(90deg, ${theme.palette.background.transparent} 0%, ${theme.palette.background.secondary} 50%, ${theme.palette.background.transparent} 100%)`,
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          <motion.div
            className="progress-bar"
            style={{
              scaleX: scrollYProgress,
              position: "fixed",
              top: "5rem",
              left: 0,
              right: 0,
              height: "1rem",
              transformOrigin: "0%",
              background: theme.palette.text.highlightAlt,
            }}
          />
          {showBackToTop && (
            <IconButton
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                backgroundColor: theme.palette.text.highlight,
                color: theme.palette.primary.contrastText,
                "&:hover":{                 backgroundColor: theme.palette.text.primary,
                }
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          )}


{/* Back to "/blog" button */}
<Link to="/blog" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                position: "fixed",
                top: "12rem",
                left: "2rem",
                backgroundColor: theme.palette.text.highlightAlt,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.text.primary,
                },
              }}
            >
              {/* You can add an icon or text here */}
              Back to Blog
            </IconButton>
          </Link>

          <Box
            sx={{
              boxShadow: theme.shadows,
              backgroundColor: theme.palette.background.main,
              padding: "2rem 1.5rem 3rem 1.5rem",
            }}
          >
            <Box
              sx={{
                height: { xs: "90vw", sm: "60vw", md: "50vw" },
                width: { xs: "90vw", sm: "90vw", md: "85vw", lg: "80vw" },
                backgroundImage: `url(${blog.blogTitleImage.fields.file.url})`,
                backgroundPosition: "center",
                backgroundSize: `100% auto`,
                backgroundRepeat: "no-repeat",
                transition: "all 0.5s ease-in-out",
              }}
            >
              {/* background image */}
            </Box>

            <Typography
              variant="h1"
              sx={{
                width: { xs: "auto", sm: "90vw", md: "85vw", lg: "80vw" },
                fontSize: { xs: "8vw", sm: "7.7vw", md: "6.5vw", lg: "5vw" },
                padding: { xs: "1rem", md: "3rem" },
                transition: "all 0.5s ease-in-out",
                fontWeight: "bold",
              }}
            >
              {blog.title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "4vw", sm: "3.9vw", md: "3.3vw", lg: "2.55vw" },
                fontStyle: "italic",
              }}
            >
              {blog.subtitle}{" "}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "4rem", marginBottom: "5rem" }}>
            {renderRichText(blog.content)}
          </Box>
        </Box>
      </Box>
    );
  }
}
