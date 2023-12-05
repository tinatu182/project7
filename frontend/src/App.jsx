import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import tools from "./tools";
import config from "./config";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  // Function for use context datas*/
  const displayUser = (user) => {
    setfirstName(user.firstName);
    setlastName(user.lastName);
    setImage(user.imageUrl);
    setUserId(user.id);
    setisAdmin(user.isAdmin);
  };

  /** Getting cookie */
  const tokenCookie = tools.getCookie("groupomania-token");
  const route = window.location.href.split("/")[3];

  /** Setting cookie in Config module */
  if (tokenCookie) {
    config.axios.headers.Authorization = tokenCookie;

    /** Get user in Backend  */
    axios
      .get(config.BACK_URL + "/auth/", config.axios)
      .then((res) => {
        /** set user in context  */
        displayUser(res.data);
      })
      .catch((err) => {
        console.error("auth/ ERROR", err);
      });
  } else {
    /** Redirect to /login if path is not public */
    if (!config.public_path.includes(route)) window.location.href = config.FRONT_URL + "/login";
  }

  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setisAdmin] = useState(null);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            displayUser,
            firstName,
            lastName,
            image,
            userId,
            isAdmin,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
