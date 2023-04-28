import React, { useState } from "react";
import {
   createUserWithEmailAndPassword,
   getAuth,
   sendEmailVerification,
   updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Signup = () => {
   // state function is here
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");

   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   const handleSignUp = (event) => {
      event.preventDefault();

      if (!/(?=.*[A-Z])/.test(password)) {
         setSuccess("");
         setError("please add atleast one uppercase letter");
         return;
      } else if (!/(?=.*[0-9])/.test(password)) {
         setSuccess("");
         setError("please add atleast one Number");
         return;
      }
      createUserWithEmailAndPassword(auth, email, password)
         .then((result) => {
            const user = result.user;
            setError("");
            setSuccess("account successfully create");
            updateName(user, name);
            sendMail(user);
            console.log(user);
         })
         .catch((error) => {
            setSuccess("");
            setError(error.message);
         });
   };

   const sendMail = (user) => {
      sendEmailVerification(user).then(() => {
         console.log("email sent successfully");
         alert("check your email");
      });
   };

   const updateName = (user, name) => {
      updateProfile(user, {
         displayName: name,
      }).then(() => {
         console.log("name updated successfully");
      });
   };

   return (
      <div className="bg-gradient-to-r w-[100%]  from-purple-500 to-indigo-500 h-screen flex items-center justify-center">
         <div className="w-[60%] border-2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-center font-bold mb-8">Sign Up</h2>
            <br />
            <p className="text-red-500">{error}</p>
            <p className="text-green-400">{success}</p>
            <form>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="name">
                     Name
                  </label>
                  <input
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="name"
                     type="text"
                     placeholder="Name"
                  />
               </div>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="email">
                     Email
                  </label>
                  <input
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     type="email"
                     placeholder="Email"
                  />
               </div>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="password">
                     Password
                  </label>
                  <input
                     onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     type="password"
                     placeholder="Password"
                  />
               </div>
               <div className="flex items-center justify-between">
                  <button
                     onClick={handleSignUp}
                     className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="button">
                     Sign Up
                  </button>
                  <div>
                     <p>
                        If You have an account please{" "}
                        <Link
                           to="/login"
                           className="text-blue-500 text-[18px] ml-1 underline hover:no-underline">
                           Log in
                        </Link>{" "}
                     </p>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Signup;
