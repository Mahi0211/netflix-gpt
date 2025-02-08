import React, { useRef, useState } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase"; //it's coming from a central place
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrMessage(message);
    if (message) return;

    // sign in and sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
        alt="logo"
        className="absolute"
      />
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute w-[30%] mx-auto mt-[92px] right-0 left-0
       bg-black text-white flex flex-col px-[68px] py-[48px] bg-opacity-80 rounded-md"
      >
        <h1 className="text-[32px] font-semibold mb-[28px]">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="flex flex-col gap-4 items-center">
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or mobile number"
            className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
          />
          <input
            ref={password}
            type="Password"
            placeholder="Password"
            className="p-4 rounded-[4px] w-full bg-black bg-opacity-60 ring-1 ring-[#5E5F5F]"
          />
          <p className="text-center text-[#E53935] font-semibold">
            {errMessage}
          </p>
          <button
            className="px-4 py-[6px] bg-[#C30702] rounded-[4px] w-full"
            onClick={handleButtonClick}
          >
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
      </motion.form>
    </div>
  );
};

export default Login;
