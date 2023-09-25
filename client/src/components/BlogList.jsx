import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import BlogItemCard from "./BlogItemCard";
import { Box, Grid, Typography } from "@mui/material";
import { axiosClient } from "../axiosClient";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
const theme = useTheme();
  useEffect(() => {
    axiosClient
      .get("/blog/read")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ zIndex: "100", width: "100%", padding:  "2.5rem"}}>
      <Box>
        <Typography variant="h1">BLOG</Typography>
      </Box>
      <Grid container spacing={5}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            
             
                <BlogItemCard blog={blog} />


          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
