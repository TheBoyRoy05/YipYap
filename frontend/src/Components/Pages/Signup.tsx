import { useState } from "react";
import Button from "../Form/Button";
import Input from "../Form/Input";
import LinkText from "../Form/LinkText";
import GenderSelect from "../Form/GenderSelect";
import useSignup from "../../Hooks/Auth/useSignup";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const { loading, signup } = useSignup();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signup({ fullName, username, password, confirmPassword, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font- text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> YipYap</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="Full Name"
            type="text"
            value={fullName}
            setValue={setFullName}
          />
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
          <Input
            name="Confirm Password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <GenderSelect gender={gender} setGender={setGender} />
          <LinkText
            href="/login"
            text="Already have an account? "
            linkText="Log In"
          />
          <Button text="Sign Up" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
