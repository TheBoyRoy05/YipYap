import Button from "../Components/Form/Button";
import Input from "../Components/Form/Input";
import Link from "../Components/Form/Link";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font- text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> YipYap</span>
        </h1>
        <form action="">
          <Input name="full name" type="text" />
          <Input name="username" type="text" />
          <Input name="password" type="password" />
          <Input name="confirm password" type="password" />
          <div className="flex">
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Male</span>
                <input type="checkbox" className="checkbox border-slate-900" />
              </label>
            </div>
            <div className="form-control">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Female</span>
                <input type="checkbox" className="checkbox border-slate-900" />
              </label>
            </div>
          </div>
          <Link href="#" text="Already have an account? " linkText="Log In" />
          <Button text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
