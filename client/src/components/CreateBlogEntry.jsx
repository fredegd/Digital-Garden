import React from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { axiosClient } from "../axiosClient";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CreateBlogEntry() {
  const { isLoading, author, login } = useContext(AuthContext);
  console.log("rendering create blog entry");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   // Convert form data to Markdown format
  //   const markdownContent = `# ${data.title}\n\n${data.subtitle}\n\n${data.author}\n\n${data.content}`;

  //   // Save the Markdown content as a .md file
  //   const blob = new Blob([markdownContent], { type: "text/markdown" });
  //   console.log(blob)
  //   // saveAs(blob, "form-data.md");

  //   // Call the external onSubmit handler (if provided)
  // };

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    console.log(formData);
    data.blogImage && data.blogImage[0] &&      formData.append("blogImage", data.blogImage[0]);
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", data.content);
    formData.append("author", author._id);
    formData.append("postCategory", "communityPost");

    axiosClient
      .post("/blog/create", formData)
      .then((response) => {
        console.log("yuhuuu")
        console.log(response.data, "response");
        console.log("upbloaded");
        // setPosts([{ ...response.data, author: user }, ...posts]);
      })
      .catch((err) => {
        console.error(err);
      });
     reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ zIndex: "1000" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="blogImage">Image:</label>
            <input
              type="file"
              id="blogImage"
              accept="image/*, .gif"
              {...register("blogImage", { required: true })}
            />
            {errors.blogImage && <span>Image is required</span>}
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" {...register("title", { required: true })} />
            {errors.title && <span>Title is required</span>}
          </div>

          <div>
            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text" {...register("subtitle", { required: true })} />
            {errors.subtitle && <span>subtitle is required</span>}
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <input type="text" {...register("content", { required: true })} />
            {errors.content && <span>content is required</span>}
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              defaultValue={author.name}
              {...register("author", { required: true })}
            />
            {errors.author && <span>author is required</span>}
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
