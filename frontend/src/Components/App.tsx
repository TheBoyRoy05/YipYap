import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { Toaster } from "react-hot-toast";
import useConversation from "../Store/useConversation.ts";
import { Navigate, Route, Routes } from "react-router-dom";
import useSocketConnection from "../Hooks/useSocketConnection.ts";
import { useEffect } from "react";
import { emptyConversation } from "../Utils/Types.ts";
import useFriends from "../Store/useFriends.ts";

const App = () => {
  const { authUser, setAuthUser, setConversation } = useConversation();
  const { setShowFriendsPage, setAddingFriends } = useFriends();
  useSocketConnection(authUser);

  // Save user on reload
  useEffect(() => {
    const currentUser = localStorage.getItem("chat-user");
    if (currentUser) setAuthUser( JSON.parse(currentUser) );
  }, [setAuthUser])
  
  // Remove receiver on reload
  useEffect(() => {
    return () => {
      setConversation(emptyConversation);
      setShowFriendsPage(false);
      setAddingFriends(false);
    };
  }, [setAddingFriends, setConversation, setShowFriendsPage]);

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
