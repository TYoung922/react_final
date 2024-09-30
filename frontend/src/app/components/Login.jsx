"use client";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useLoginUser } from "../queries/Auth";
// import { queryClient } from "../constants/config";

// // import {qu}

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [pw, setPw] = useState("");

// //   let body = { username: username, password: pw };

// //   const {
// //     mutate: loginHandler,
// //     isLoading: loggingIn,
// //     isError,
// //     error,
// //   } = useLoginUser();

// //   return (
// //     <div className="container">
// //       <nav className="fixed mx-auto border-yellow-200 top-0 left-0 right-0 z-10 bg-black">
// //         <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-5 py-2">
// //           <Link
// //             href={"/"}
// //             className="text-1xl md:text-6xl font-bold leading-normal py-2 bg-gradient-to-r from-primary-400 to-secondary-300 bg-clip-text text-transparent"
// //           >
// //             Yodel
// //           </Link>
// //         </div>
// //       </nav>
// //       <form action="submit" onSubmit={(e) => e.preventDefault()}>
// //         <div className="container">
// //           <h1 className="text-center">Login</h1>
// //           <span>User Name:</span>
// //           <input
// //             type="text"
// //             autoComplete="username"
// //             onChange={(e) => setUsername(e.target.value)}
// //             value={username}
// //           />
// //           <span>Password:</span>
// //           <input
// //             type="password"
// //             onChange={(e) => setPw(e.target.value)}
// //             value={pw}
// //             autoComplete="password"
// //           />
// //           <button
// //             onClick={() =>
// //               loginHandler(body, {
// //                 onSuccess: () => queryClient.invalidateQueries("user"),
// //               })
// //             }
// //           >
// //             Log In
// //           </button>
// //         </div>
// //         <Link className="text-center" to="/register">
// //           Become a Yodeller
// //         </Link>
// //         {isError && (
// //           <p className="text-center text-red-600">
// //             {JSON.stringify(error?.response?.data?.message)}
// //           </p>
// //         )}
// //       </form>
// //     </div>
// //   );
// // };

// export default Login;
// "use client";
// import styles from "../styles/Auth.module.scss";
// import MainContainer from "../components/Containers/MainContainer";
// import { Title } from "../components/Titles/Titles";
import { useState } from "react";
// import { useLoginUser } from "../queries/user";
import { Link } from "react-router-dom";
import { queryClient } from "../constants/config";
import { QueryClientProvider } from "react-query";
// import Spinner from "../components/Spinner";

const Auth = () => {
  //Login
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  let body = { email: email, password: pw };

  const {
    mutate: loginHandler,
    isLoading: loggingIn,
    isError,
    error,
  } = useLoginUser();

  return (
    <div>
      {/* LogIn  */}
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className="container">
          <h1>Login</h1>
          <span>Email:</span>
          <input
            type="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete="password"
          />

          {/* Login BTN  */}
          <button
            onClick={() =>
              loginHandler(body, {
                onSuccess: () => queryClient.invalidateQueries("user"),
              })
            }
          >
            Login Now
          </button>
        </div>
        <Link style={{ textAlign: "center" }} to="/register">
          Don't have an account?
        </Link>
        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>
            {JSON.stringify(error?.respnse?.data?.message)}
          </p>
        )}
      </form>

      {loggingIn && <Spinner fullPage />}
    </div>
  );
};

export default Auth;
