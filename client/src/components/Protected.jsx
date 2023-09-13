import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Landing from "./Landing";
import CreateBlogEntry from "./CreateBlogEntry";

export default function Protected() {
  const { author, isLoading } = useContext(AuthContext);
  console.log(author, isLoading)

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!isLoading && !author) {
    return <Navigate to="/login" />;
  }

  if (!isLoading && author) {
    return <CreateBlogEntry />;
  }
}
