import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AUTH_URL, CLUB_URL } from "../../../API/config";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { UserManagementTabContext } from ".";
import { fetchAddUser, fetchGetUser, fetchUpdateUser } from "../../../API/calls";

const AddUsers = () => {
  const { updateState } = useContext(UserManagementTabContext);

  const [ID, setID] = useState("");
  const [user, setUser] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [rights, setRights] = useState("");
  const [pwd, setPWD] = useState("");
  const [rpwd, setRPWD] = useState("");
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setAssociationName(updateState.associationName);
      setUser(updateState?.userId);
      setRights(updateState?.rights);
      setID(updateState?._id);
    }
  }, [updateState]);

  const checkPassword = () => {
    if (pwd === rpwd) {
      return true;
    }
    toast.error("Passwords do not match");
    return false;
  }

  const handleAddUser = async () => {
    if (!checkPassword()) return;
    fetchAddUser({
      "associationName": associationName,
      "userId": user,
      "password": pwd,
      "rights": rights,
    }).then(res => {
      toast.success("User Added Successfully");
    }).catch(err => {
      toast.error("Error: " + err.response.data.error);
    })
  }

  const handleUpdate = async () => {
    console.log("Users")
    console.log(fetchGetUser(ID).rights);
    if (rights === "admin" || rights === "developer") {
      toast.error("Cannot update admin or developer");
      return;
    } else {
      const postBody = {
        associationName: associationName,
        userId: user,
        rights: rights,
      };
      toast.promise(fetchUpdateUser(postBody, ID)
        .then((res) => {
          window.location.reload();
        }), {
        loading: "Adding...",
        success: "Added Successfully",
        error: (err) => `Error: ${err.response.data.error}`,
      });
    }
  };

  const handleCancel = () => {
    console.log("Cancel Button");
    window.location.reload();
  };

  return (
    <section className="px-8 py-8 w-full">
      <Heading>
        {Object.keys(updateState).length <= 0 ? "Add" : "Update"} User
      </Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[rights, setRights]}
            title="Rights"
            placeholder="Select a Privilege"
            options={["club", "dean", "admin"]}
          />
          <Dropdown
            valueState={[associationName, setAssociationName]}
            title="Association Name"
            placeholder="Select an Association"
            options={clubs.map((club) => club.clubName)}
            className="w-full"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[user, setUser]}
            title="User Id"
            placeholder="Enter userId"
          />
          <Inputfield
            type="password"
            valueState={[pwd, setPWD]}
            title="Password"
            isDisabled={Object.keys(updateState).length > 0}
            placeholder="Enter your password here"
          />
          <Inputfield
            type="password"
            valueState={[rpwd, setRPWD]}
            title="Re-Enter Password"
            isDisabled={Object.keys(updateState).length > 0}
            placeholder="Re-Enter your password here"
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4"></div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text={"Add User"}
              handleClick={handleAddUser}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Update User"} handleClick={handleUpdate} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
