import { useState } from "react";
import Button from "../Form/Button";
import Input from "../Form/Input";
import LinkText from "../Form/LinkText";
import useLogin from "../../Hooks/Auth/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font- text-center text-gray-300">
          Login
          <span className="text-blue-500"> YipYap</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="Username"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <Input
            name="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <LinkText
            href="/signup"
            text={"Don't have an account? "}
            linkText={"Sign Up"}
          />
          <Button text="Login" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Login;
