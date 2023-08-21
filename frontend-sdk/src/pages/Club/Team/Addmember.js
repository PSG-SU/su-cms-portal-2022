import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AUTH_URL } from "../../../API/config";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import { departments } from "../../../components/Departments";
import DateInput from "../../../components/DateInput";
import { fetchAddTeamMember, fetchUpdateTeamMember, fetchUploadFile } from "../../../API/calls";
import { TeamMemberContext } from ".";

const AddMember = () => {
  const { updateState } = useContext(TeamMemberContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${AUTH_URL}/id/${localStorage.getItem("userId")}`, {})
      .then((res) => {
        setUser(res.data.caID);
      })
  }, [])

  const [ID, setID] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [desgn, setDesgn] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [image_url, setImage_url] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    console.log("UpdateState" + updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setPosition(updateState?.position);
      setName(updateState?.name);
      setDept(updateState?.department);
      setDesgn(updateState?.designation);
      setYear(updateState?.year);
      setImage_url(updateState?.image_url);
      setFrom(updateState.from ? Date.parse(updateState?.from) : "");
      setTo(updateState.to ? Date.parse(updateState?.to) : "");
    }
  }, [updateState]);

  const handleAddMember = async () => {
    if (position === "Student") {
      if (!year) {
        return toast.error("Please enter the year of study");
      }
      if (from === "" || to === "") {
        return toast.error("Please enter the FROM and TO years");
      }
    }

    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        setImage_url(res.data.url);
        const postBody = {
          position: position,
          name: name,
          department: dept,
          designation: desgn,
          year: year,
          image_url: res.data.url,
          from: from,
          to: to,
          user: user,
        };
        toast.promise(fetchAddTeamMember(postBody)
          .then((res) => {
            window.location.reload();
          }), {
          loading: "Adding...",
          success: "Added Successfully",
          error: (err) => `Error: ${err.response.data.error}`,
        });
        return "Uploaded";
      },
      error: "Error Occured",
    });
  };

  const handleUpdateMember = async () => {
    if (position === "Student") {
      if (!year) {
        return toast.error("Please enter the year of study");
      }
      if (from === "" || to === "") {
        return toast.error("Please enter the FROM and TO years");
      }
    }

    if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading...",
        success: (res) => {
          setImage_url(res.data.url);
          const postBody = {
            position: position,
            name: name,
            department: dept,
            designation: desgn,
            year: year,
            image_url: res.data.url,
            from: from,
            to: to,
          };
          toast.promise(fetchUpdateTeamMember(postBody, ID)
            .then((res) => {
              window.location.reload();
            }), {
            loading: "Updating...",
            success: "Updated Successfully",
            error: (err) => `Error: ${err.response.data.error}`,
          });
          return "Uploaded";
        },
        error: "Error Occured",
      });
    } else {
      const postBody = {
        position: position,
        name: name,
        department: dept,
        designation: desgn,
        year: year,
        from: from,
        to: to,
      };
      toast.promise(fetchUpdateTeamMember(postBody, ID)
        .then((res) => {
          window.location.reload();
        }), {
        loading: "Updating...",
        success: "Updated Successfully",
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
      <Heading>Content for website</Heading>
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[position, setPosition]}
            title="Position"
            placeholder="Select a Position"
            options={[
              "Faculty Advisor",
              "Student",
            ]}
          />
          <Inputfield
            valueState={[name, setName]}
            title="Member Name"
            placeholder="Enter the name of the member"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[desgn, setDesgn]}
            title="Designation"
            placeholder={`${position === "Faculty Advisor" ? "Eg. Associate Professor" : "Eg. Secretary"}`}
          />
          {position === "Student" &&
            <Inputfield
              valueState={[year, setYear]}
              title="Year of Study"
              placeholder="Eg. 3rd Year"
            />
          }
          <Dropdown
            valueState={[dept, setDept]}
            title="Department"
            placeholder="Select a Department"
            options={departments}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <FileUpload
            title="Member Photo"
            fileState={[file, setFile]}
            url={image_url}
          />
          <DateInput
            startTitle={`From ${position === "Faculty Advisor" ? "(Optional)" : ""}`}
            endTitle={`To ${position === "Faculty Advisor" ? "(Optional)" : ""}`}
            startState={[from, setFrom]}
            endState={[to, setTo]}
            dateformat="yyyy"
            range
            year
          />
        </div>

        <div className="flex items-center space-x-4 mt-8 w-1/2">
          {Object.keys(updateState).length <= 0 ? (
            <Button
              className="w-3/4"
              text="Add Member"
              handleClick={handleAddMember}
            />
          ) : (
            <div className="flex items-center w-full space-x-4 mt-4">
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
              <Button className="w-3/4" text={"Update Member"} handleClick={handleUpdateMember} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddMember;
