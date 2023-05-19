import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { toast } from "react-hot-toast";
import { fetchChangePassword } from "../../../API/calls";
import { AUTH_URL } from "../../../API/config";
import axios from "axios";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setID(res.data._id);
      });
  }, []);

  const handleClick = () => {
    if (pass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const postBody = {
      oldPassword: oldPass,
      newPassword: pass,
    };

    toast.promise(fetchChangePassword(postBody, id), {
      loading: "Changing Password...",
      success: (res) => {
        window.location.reload();
        return "Password Changed";
      },
      error: (err) => {
        return `Error: ${err.response.data.error}`;
      },
    });
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>Change Password</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[oldPass, setOldPass]}
            title="Enter your current password"
            placeholder="Current Password"
            className="w-1/2"
            type="password"
          />
        </div>

        <div className="mt-4 flex items-center w-full space-x-4">
          <Inputfield
            valueState={[pass, setPass]}
            title="Enter your new password"
            type="password"
            placeholder="Password"
          />
          <Inputfield
            valueState={[confirm, setConfirm]}
            title="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          <Button className="w-3/4" text="Change" handleClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
