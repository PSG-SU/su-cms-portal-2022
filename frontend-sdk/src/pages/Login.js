import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../API/calls";
import Button from "../components/Button";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const postBody = { userId: username, password: password };
    fetchLogin(postBody)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rights", res.data.rights);
        localStorage.setItem("userId", username);
        toast.success("Login Successful !");

        if (res.data.rights === "admin") {
          navigate("/admin");
        } else if (res.data.rights === "club" || res.data.rights === "association") {
          navigate("/club");
        } else if (res.data.rights === "dean") {
          navigate("/dean");
        } else if (res.data.rights === "faculty") {
          navigate("/faculty");
        } else {
          toast.error("Invalid Rights");
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.code === "ERR_BAD_REQUEST") {
          toast.error('Invalid Credentials!');
        } else {
          toast.error(`Error: ${err}`);
        }
      });
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-br to-black from-blue flex items-center justify-center">
      <div className="w-[400px] h-fit bg-white rounded-lg p-8 shadow-lg">
        <Heading>Login</Heading>
        <TextInput
          className="mt-8"
          valueState={[username, setUsername]}
          placeholder="Enter Username"
          title="Username"
        />
        <TextInput
          className="mt-4"
          valueState={[password, setpassword]}
          placeholder="Enter Password"
          title="Password"
          type="password"
        />
        <Button text="Login" className="mt-8" handleClick={handleClick} />
      </div>
    </main>
  );
};

export default Login;
