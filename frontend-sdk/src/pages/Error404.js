import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-bl from-blue to-black flex flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/hKwF3v0/404.png"
        alt="404 Error"
        className="h-36"
      />
      <h1 className="text-yellow text-4xl font-bold uppercase">
        Page not found :(
      </h1>
      <h2 className="text-white mt-4">
        Wanna go to{" "}
        <Link className="text-yellow hover:underline" to="/login">
          Login
        </Link>{" "}
        Page (uWu) ?
      </h2>
    </div>
  );
};

export default Error404;
