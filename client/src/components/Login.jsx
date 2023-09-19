import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, author, login } = useContext(AuthContext);
  console.log(author, "author", isLoading, "isLoading");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data);

    reset();
  };

  if (!isLoading && author !== null) {
    return <Navigate to={`../${author.username}/create-blog`} />;
  }

  if (!isLoading && !author) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <Box sx={{zIndex:"1000"}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input defaultValue="your@email.com" {...register("email")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
          </form>
        </Box>
      </Box>
    );
  }
}
