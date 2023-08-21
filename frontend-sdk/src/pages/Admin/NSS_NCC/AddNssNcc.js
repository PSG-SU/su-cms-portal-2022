import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAddNssNcc, fetchUpdateNssNcc } from "../../../API/calls";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { NssNccTabContext } from ".";

const AddNssNcc = () => {
  const { updateState } = useContext(NssNccTabContext);

  const [ID, setID] = useState("");
  const [scheme, setScheme] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("")

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setScheme(updateState?.scheme);
      setName(updateState?.name);
      setPriority(updateState?.priority);
      setDepartment(updateState?.dept);
      setRole(updateState?.role);
      setID(updateState?._id);
    }
  }, [updateState]);

  const handlePost = async () => {
    const postBody = {
      name: name,
      scheme: scheme,
      priority: priority,
      dept: department,
      role: role,
    };
    toast.promise(fetchAddNssNcc(postBody)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleUpdate = async () => {
    const postBody = {
      name: name,
      scheme: scheme,
      priority: priority,
      dept: department,
      role: role,
    };
    toast.promise(fetchUpdateNssNcc(postBody, ID)
      .then((res) => {
        window.location.reload();
      }), {
      loading: "Adding...",
      success: "Added Successfully",
      error: (err) => `Error: ${err.response.data.error}`,
    });
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} Member
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Inputfield
            valueState={[name, setName]}
            title="Name"
            placeholder="Enter name"
          />
          <Dropdown
            valueState={[scheme, setScheme]}
            title="NSS / NCC"
            placeholder="Select NSS / NCC"
            options={[
              "NSS", "NCC"
            ]}
            className="w-full"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[priority, setPriority]}
            title="Priority"
            placeholder="Enter Priority"
          />
          <Inputfield
            valueState={[department, setDepartment]}
            title="Department"
            placeholder="Enter Department"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[role, setRole]}
            title="Role (Optional)"
            placeholder="Enter Role"
            className="w-1/2"
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text="Add Staff"
              handleClick={handlePost}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update Staff"} handleClick={handleUpdate} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddNssNcc;
