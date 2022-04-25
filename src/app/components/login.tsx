import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { resetUser, setUser } from "../../features/slices/userSlice";
import { authService } from "../../features/services/auth";
import Input from "./input";
import Button from "./button";
import logo from '../assets/Nilam.png';

function Login() {
  const emailRef = React.createRef<HTMLInputElement>(),
    passwordRef = React.createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  let [error, setError] = useState("");

  const user = useAppSelector((state) => state.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //  prevent page reload
    e.preventDefault();
    setError("");

    let email = emailRef.current?.value,
      password = passwordRef.current?.value;

    if (!email || !password) return;

    //  login using firebase
    // 	saving the user in redux will be handled in app.tsx

    authService
      .signInUser(email, password)
      .then((user) => dispatch(setUser(user)))
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        switch (errorCode) {
          case "auth/wrong-password":
            setError("Email and password does not match");
            break;
          case "auth/user-not-found":
            setError("User does not exists");
            break;
          case "auth/user-disabled":
            setError("User Inactive");
            break;
          default:
            setError("Something went wrong. Couldn't Log you in.");
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-40 border-slash-200 border-2 rounded p-16 shadow-gray-600/50">

      <img src={logo} alt="nilam" className="h-20  mx-auto mb-6" />
      
      <h2 className="text-4xl pb-4 font-semibold">Login</h2>
      <p className="text-sm mb-8 text-gray-600">
        SignIn to your account to access dashboard
      </p>

      {error && (
        <p className="flex gap-2 mb-8 p-4 bg-red-400 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{" "}
          {error}
        </p>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Email"
          ref={emailRef}
          placeholder="Email"
          required={true}
          type="email"
        ></Input>
        <Input
          label="Password"
          ref={passwordRef}
          required={true}
          placeholder="password"
          type="password"
        ></Input>
        <button
          type="submit"
          onClick={() => {
            authService.signOut();
            dispatch(resetUser());
          }}
        >
          Login
        </button>
      </form>
      <p>{user?.uid}</p>
      <Button type="submit">
        {/* // onClick={() => {
        authService.signOut();
        dispatch(resetUser());
      }} */}
        Logout
      </Button>
    </div>
  );
}

export default Login;
