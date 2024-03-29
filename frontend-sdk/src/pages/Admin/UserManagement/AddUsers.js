import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CLUB_URL } from "../../../API/config";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { UserManagementTabContext } from ".";
import { fetchAddUser, fetchUpdateUser } from "../../../API/calls";

const AddUsers = () => {
  const { updateState } = useContext(UserManagementTabContext);

  const [ID, setID] = useState("");
  const [caID, setcaID] = useState("");
  const [clubName, setClubName] = useState("");
  const [user, setUser] = useState("");
  const [rights, setRights] = useState("");
  const [pwd, setPWD] = useState("");
  const [rpwd, setRPWD] = useState("");
  const [clubs, setClubs] = useState([]);
  const [dropdownRights, setDropdownRights] = useState("");

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (clubName) {
      setcaID(clubs.filter((club) => club.clubName === clubName)[0]?.clubId);
    }
  }, [clubName, clubs]);

  useEffect(() => {
    if (caID) {
      setClubName(clubs.filter((club) => club.clubId === caID)[0]?.clubName);
    }
  }, [caID, clubs]);

  useEffect(() => {
    if (dropdownRights === "Admin") {
      setRights("admin");
    } else if (dropdownRights === "Dean") {
      setRights("dean");
    } else if (dropdownRights === "Club") {
      setRights("club");
    } else if (dropdownRights === "Association") {
      setRights("association");
    } else if (dropdownRights === "Faculty") {
      setRights("faculty");
    }
  }, [dropdownRights])

  useEffect(() => {
    if (rights === "admin") {
      setDropdownRights("Admin");
    } else if (rights === "dean") {
      setDropdownRights("Dean");
    } else if (rights === "club") {
      setDropdownRights("Club");
    } else if (rights === "association") {
      setDropdownRights("Association");
    } else if (rights === "faculty") {
      setDropdownRights("Faculty");
    }
  }, [rights]);

  useEffect(() => {
    console.log(updateState);
    if (Object.keys(updateState).length > 0) {
      setID(updateState?._id);
      setcaID(updateState?.caID);
      setUser(updateState?.userId);
      setRights(updateState?.rights);
      setPWD(updateState?.password);
      setRPWD(updateState?.password);
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
      "caID": caID,
      "userId": user,
      "password": pwd,
      "rights": rights,
    }).then(res => {
      toast.success("User Added Successfully");
      window.location.reload();
    }).catch(err => {
      toast.error("Error: " + err.response.data.error);
    })
  }

  const handleUpdate = async () => {
    if (pwd != null && rpwd != null) {
      if (checkPassword()) {
        const postBody = {
          caID: caID,
          userId: user,
          rights: rights,
          password: pwd,
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
    } else {
      const postBody = {
        caID: caID,
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
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[dropdownRights, setDropdownRights]}
            title="Rights"
            placeholder="Select a Privilege"
            options={["Admin", "Dean", "Club", "Association", "Faculty"]}
          />
          <Dropdown
            valueState={[clubName, setClubName]}
            title="Club / Association Name"
            placeholder="Select a Club / Association"
            options={clubs.map((club) => club.clubName)}
            className="w-full"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[user, setUser]}
            title="User ID"
            placeholder="Enter User ID"
          />
          <Inputfield
            type="password"
            valueState={[pwd, setPWD]}
            title="Password"
            // isDisabled={Object.keys(updateState).length > 0}
            placeholder="Enter your password here"
          />
          <Inputfield
            type="password"
            valueState={[rpwd, setRPWD]}
            title="Re-Enter Password"
            // isDisabled={Object.keys(updateState).length > 0}
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
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update User"} handleClick={handleUpdate} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddUsers;
