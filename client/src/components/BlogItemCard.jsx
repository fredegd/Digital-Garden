import ReactMarkdown from "react-markdown";
import { motion, useAnimation } from "framer-motion";

import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDarkMode } from "../context/DarkModeContext.jsx";

export default function BlogItemCard({ blog }) {
  const { dk } = useDarkMode();
  const theme = useTheme();

  console.log(blog.title, typeof blog.blogImage);
  console.log(blog.content.length);
  const titlePreview =
    blog.title.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title;
  const contentPreview =
    blog.content.length > 100
      ? blog.content.slice(0, 100) + "..."
      : blog.content;
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.15,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to={`/blog/read/${blog._id}`}
          style={{ textDecoration: "none", color: theme.palette.text.primary }}
        >
          <Box
            sx={{
              backgroundColor: `${theme.palette.background.transparent}`,
              display: "flex",
              flexDirection: "column",
              minHeight: "25rem",
              border: "1px solid black",
            }}
          >
            {blog && (
              <>
                {" "}
                <Box
                  sx={{
                    zIndex: "100",
                    height: "200px",
                    width: "100%",
                    backgroundImage: `url(${blog.blogImage})`,
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  {/* background image */}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{
                    width: "100%",
                    transition: "all 0.5s ease-in-out",
                    fontFamily: "IBM Plex Mono, sans-serif",
                  }}
                >
                  <ReactMarkdown
                    style={{ zIndex: "100" }}
                    components={{
                      // Map `h1` (`# heading`) to use `h2`s.
                      h1: "h2",
                      // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                      em: ({ node, ...props }) => (
                        <i style={{ color: "red" }} {...props} />
                      ),
                    }}
                  >
                    {titlePreview}
                  </ReactMarkdown>
                  <ReactMarkdown style={{ zIndex: "100" }}>
                    {contentPreview}
                  </ReactMarkdown>
                </Box>
              </>
            )}
          </Box>
        </Link>
      </motion.div>
    </>
  );
}
