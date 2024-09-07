import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { Toaster } from "react-hot-toast";
import useStore from "../Store/useStore.ts";
import { Navigate, Route, Routes } from "react-router-dom";
import useSocketConnection from "../Hooks/useSocketConnection.ts";
import { useEffect } from "react";

const App = () => {
  const { authUser, setAuthUser } = useStore();
  useSocketConnection(authUser); // Connect to socket server

  // Save user on reload
  useEffect(() => {
    const currentUser = localStorage.getItem("chat-user");
    if (currentUser) setAuthUser( JSON.parse(currentUser) );
  }, [setAuthUser])

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser._id ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser._id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser._id ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
