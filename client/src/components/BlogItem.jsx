import ReactMarkdown from "react-markdown";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDarkMode } from "../context/DarkModeContext.jsx";

export default function BlogItem({ blog }) {
  const { dk } = useDarkMode();
  const theme = useTheme();

  console.log(blog.title, typeof blog.blogImage);
  return (
    <>
      <Box sx={{ border: "10px solid red", backgroundColor:`${theme.palette.background.transparent}`}}>
        <ReactMarkdown style={{ zIndex: "100" }}>{blog.title}</ReactMarkdown>
        <ReactMarkdown style={{ zIndex: "100" }}>{blog.content}</ReactMarkdown>
{blog &&        <div style={{ zIndex: "100",  height:"400px",backgroundImage: `url(${blog.blogImage})`, backgroundPosition:"center", backgroundSize:"100% auto", backgroundRepeat:"no-repeat"}} >  

        {/* <img src={blog.blogImage} alt={blog.blogImage} style={{width:"100%", maxHeight:"100px", }} /> */}
        </div>}
      </Box>
    </>
  );
}
