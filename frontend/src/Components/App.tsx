import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import useStore from "../Store/useStore";

const App = () => {
  const { authUser } = useStore();

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
