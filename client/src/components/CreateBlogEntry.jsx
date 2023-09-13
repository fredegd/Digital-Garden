import React from "react";
import { useForm } from "react-hook-form";
import { saveAs } from 'file-saver';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";




export default function CreateBlogEntry() {

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    // Convert form data to Markdown format
    const markdownContent = `# ${data.title}\n\n${data.description}`;

    // Save the Markdown content as a .md file
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    saveAs(blob, 'form-data.md');

    // Call the external onSubmit handler (if provided)
   
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input {...register('title', { required: true })} />
        {errors.title && <span>Title is required</span>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea {...register('description', { required: true })} />
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
