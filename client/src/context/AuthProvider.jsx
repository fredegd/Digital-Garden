import { createContext, useState, useEffect } from "react";
import { axiosClient } from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState();
  const [isLoading, setIsLoading] = useState(true);

  ///////// IMPORTANT!
  ////////this is setting the author Profile data only if the cookies are valid.
  /////////
  useEffect(() => {
    axiosClient
      .get("/auth/profile")
      .then((response) => {
        setAuthor(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setAuthor(null);
        setIsLoading(false);
        console.log(err);
      });
  }, []);



  const login = (data) => {
    axiosClient
      .post("/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if ((response.status = 200)) {
          const returnedInfo = response.data;
          setAuthor(returnedInfo);
          setIsLoading(false);

          console.log(
            "authentication complete, Welcome",
            returnedInfo.username
          );

          navigate(`/${returnedInfo.username}/create-blog`);
        } else {
          console.log("error at Login");
          navigate(`/login`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const logout = () => {
    axiosClient
      .post("/auth/logout")
      .then((response) => {
        setAuthor(null);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider value={{ login, logout,  author, isLoading }} >
      {children}
    </AuthContext.Provider>
  );
}
