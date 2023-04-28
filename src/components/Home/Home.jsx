import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
// You can define your custom styles in this file

const Home = () => {
   const [showTypewriter, setShowTypewriter] = useState(false);

   useEffect(() => {
      setShowTypewriter(true);
   }, []);

   const words = ["Welcome to my website!", "I hope you enjoy your stay."];

   return (
      <div className="h-[86vh] w-screen flex justify-center items-center bg-gradient-to-r from-purple-700 to-blue-500">
         <div className="w-3/4 md:w-1/2 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-400 mb-8">
               {words[0]}
            </h1>
            <h2 className="text-red-300">
               {showTypewriter && (
                  <Typewriter words={words} speed={70} delay={1000} />
               )}
            </h2>
         </div>
      </div>
   );
};

const Typewriter = ({ words, speed, delay }) => {
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const [currentText, setCurrentText] = useState("");

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (currentTextIndex < words[currentWordIndex].length) {
            setCurrentText(
               words[currentWordIndex].substring(0, currentTextIndex + 1)
            );
            setCurrentTextIndex(currentTextIndex + 1);
         } else {
            clearInterval(intervalId);
            setTimeout(() => {
               setCurrentWordIndex((currentWordIndex + 1) % words.length);
               setCurrentTextIndex(0);
               setCurrentText("");
            }, delay);
         }
      }, speed);

      return () => clearInterval(intervalId);
   }, [currentTextIndex, currentWordIndex, delay, speed, words]);

   return (
      <h2 className="text-2xl md:text-4xl font-semibold text-white">
         {currentText}
      </h2>
   );
};

export default Home;
