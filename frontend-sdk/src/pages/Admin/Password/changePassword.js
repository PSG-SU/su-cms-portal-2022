import React, { useState } from "react";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";

const ChangePassword = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <section className="px-8 py-8 w-full">
            <Heading>Change Password</Heading>
            <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
                <div className="flex items-center w-full space-x-4">
                    <Inputfield
                        valueState={[user, setUser]}
                        title="Enter the username"
                        placeholder="Username"
                    />
                    <Inputfield
                        valueState={[pass, setPass]}
                        title="Enter your new password"
                        placeholder="Password"
                    />
                    <Inputfield
                        valueState={[confirm, setConfirm]}
                        title="Confirm Password"
                        placeholder="Re-type your password"
                    />
                </div>
                <div className="flex items-center space-x-4 mt-8 w-1/2">
                    <Button className="w-3/4" text="Change" />
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
