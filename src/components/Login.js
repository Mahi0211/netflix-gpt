import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
        srcset="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_small.jpg 959w"
        alt=""
        aria-hidden="true"
        className="absolute"
      />
      <form
        className="absolute w-[30%] mx-auto mt-[92px] right-0 left-0
       bg-black text-white flex flex-col px-[68px] py-[48px] bg-opacity-80 rounded-md"
      >
        <h1 className="text-[32px] font-semibold mb-[28px]">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="flex flex-col gap-4 items-center">
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Name"
              className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
            />
          )}
          <input
            type="text"
            placeholder="Email or mobile number"
            className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
          />
          <input
            type="Password"
            placeholder="Password"
            className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
          />
          <button className="px-4 py-[6px] bg-[#C30702] rounded-[4px] w-full">
            {isSignInForm ? "Sign in" : "Sign up"}
          </button>
          {isSignInForm && (
            <p className="w-full text-center text-[#B6B6B6]">OR</p>
          )}
          {isSignInForm && (
            <button className="px-4 py-[6px] bg-[#808080] bg-opacity-40 rounded-[4px] w-full">
              Use a sign-in code
            </button>
          )}
          {isSignInForm && (
            <a
              href="in"
              className="cursor-pointer text-current hover:underline hover:text-[#B6B6B6]"
            >
              Forgot password?
            </a>
          )}
        </div>
        <label className="mt-5">
          <input type="checkbox" />
          <span className="pl-3">Remember me</span>
        </label>
        <p className="text-[#B6B6B6] mt-4">
          {isSignInForm ? "New to Netflix?" : "Already a user?"}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toogleSignInForm}
          >
            {" "}
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
