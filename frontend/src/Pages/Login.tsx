import Button from "../Components/Button";
import Input from "../Components/Input";
import Link from "../Components/Link";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font- text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form action="">
          <Input name="username" type="text" />
          <Input name="password" type="password" />
          <Link
            href="#"
            text={"Don't have an account? "}
            linkText={"Sign Up"}
          />
          <Button text="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
