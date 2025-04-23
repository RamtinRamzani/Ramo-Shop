import { useNavigate } from "react-router-dom";

import LoginInput from "./LoginInput";

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="flex max-sm:flex-col">
      <div className="sm:w-1/2 h-1/2 bg-bg-color">
        <img
          src="images/login-01.jpg"
          className="object-cover w-full max-sm:h-[300px] sm:h-screen"
          alt="sofa"
        />
      </div>
      <div className="flex flex-col justify-center sm:w-1/2 ~px-4/16 max-sm:py-10">
        <h2 className="~mb-1/6 ~text-2xl/4xl font-semibold">Login</h2>
        <div className="~mb-3/6 ~text-xs/lg text-neutral-04">
          Don't have an account yet ?
          <span
            className="~ml-1/2 overflow-hidden font-semibold text-red-400 cursor-pointer hover:text-red-600"
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </span>
        </div>

        <LoginInput />
      </div>
    </div>
  );
}
