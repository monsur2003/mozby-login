import React, { useRef, useState } from "react";
import "./Login.css";
import {
   GoogleAuthProvider,
   getAuth,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// start form here login function
const Login = () => {
   // state is here

   const [user, setUser] = useState({});
   console.log(user);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const emailRef = useRef();

   // email password signIn function

   const handleSignIn = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
         .then((result) => {
            const user = result.user;
            setUser(user);
            setError("");
            setSuccess("user login successful");
            form.reset();
         })
         .catch((error) => {
            setSuccess("");
            setError(error.message);
         });
   };

   // google signIn
   const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
         .then((result) => {
            const user = result.user;
            setUser(user);
            console.log(user);
         })
         .catch((error) => {
            console.log(error.message);
         });
   };

   const handleReset = () => {
      const userMail = emailRef.current.value;
      if (!userMail) {
         setSuccess("");
         setError("");
         setError("please enter a valid email");
         return;
      }
      sendPasswordResetEmail(auth, userMail).then(() => {
         alert("Please check your email");
      });
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-600 flex flex-col justify-center items-center">
         <div className="bg-white w-[60%] rounded-lg shadow-md p-10 flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-5">Login</h2>

            <p className="text-red-400">{error}</p>
            <p className="text-green-400">{success}</p>
            <form onSubmit={handleSignIn} className="w-[80%] mx-auto space-y-4">
               <div className="w-full">
                  <label
                     htmlFor="email"
                     className="block text-lg font-medium text-gray-700 mb-1">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     ref={emailRef}
                     className="w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
               </div>
               <div className="w-full">
                  <label
                     htmlFor="password"
                     className="block text-lg font-medium text-gray-700 mb-1">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     className="w-full input border-blue-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
               </div>
               <div className="w-full">
                  <input
                     type="submit"
                     className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600 transition-all duration-300"
                     value="sign in"
                  />
               </div>
               <div className=" w-full flex items-center justify-center">
                  <button
                     type="button"
                     onClick={handleGoogleSignIn}
                     className="bg-pink-700 text-white w-full py-2 rounded-md border border-gray-300 hover:border-gray-400 hover:text-gray-700 transition-all duration-300">
                     Sign In with Google
                  </button>
               </div>

               <div></div>
            </form>
            <p>
               If You Forget your password Please{" "}
               <button
                  onClick={handleReset}
                  className="text-blue-500 underline">
                  Reset
               </button>
            </p>
            <div>
               <p>
                  <small>
                     If You are New in this Site please{" "}
                     <Link
                        to="/register"
                        className="text-blue-600 underline text-[18px] ml-1 hover:no-underline">
                        Sign up
                     </Link>{" "}
                  </small>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Login;
