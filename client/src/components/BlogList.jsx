import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { Box } from "@mui/material";
import { axiosClient } from "../axiosClient";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

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
    <Box sx={{ zIndex: "100", maxWidth: " 800px" }}>
      {blogs.map((blog) => {
        return <BlogItem key={blog._id} blog={blog} />;
      })}
    </Box>
  );
}
