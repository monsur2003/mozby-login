import React from "react";
import { Link } from "react-router-dom";
import monsur from "../../assets/FC_20220419_0134-PhotoRoom (1)_11zon (1)_11zon.jpg";

const Header = () => {
   return (
      <header className="bg-indigo-900 py-4">
         <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">
               <Link to="/">MozzBytm</Link>
            </div>
            <nav className="flex space-x-4 text-white text-lg">
               <Link to="/">Home</Link>
               <Link to="/login">LogIn</Link>
               <Link to="/register">SignUp</Link>
            </nav>
            <div className="flex items-center">
               <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-400">
                  <img
                     src={monsur}
                     alt="profile"
                     className="h-full w-full object-cover"
                  />
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
