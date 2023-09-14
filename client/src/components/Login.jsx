import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { cols } from "../colorSchema";

export default function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, author, login } = useContext(AuthContext);
  console.log(author,isLoading);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data);

    reset();
  };
  

  if (!isLoading && author) {
    return <Navigate to={`../${author.username}/create-blog`} />;
  }

  if (!isLoading && !author) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 "
        style={{
          backgroundColor: cols.secondary,
          color: cols.main,
          // paddingTop: "-2rem",
        }}
      >
        <div
          className="col-lg-6 col-md-8 col-sm-9 col-10 container-fluid  p-5 rounded-4 fs-5"
          style={{ backgroundColor: cols.secondary, color: cols.main }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Sign In</h3>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
              />
            </Form.Group>

            <Form.Group controlId="rememberMe" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                {...register("rememberMe")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
