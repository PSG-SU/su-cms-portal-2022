import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const user = localStorage.getItem("userId");

  const [ID, setID] = useState("");
  const [pos, setPos] = useState("");
  const [mname, setMname] = useState("");
  const [dept, setDept] = useState("");
  const [desgn, setDesgn] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [image_url, setImage_url] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  useEffect(() => {
    console.log("UpdateState" + updateState);
    if (Object.keys(updateState).length >= 0) {
      setID(updateState?._id);
      setPos(updateState?.position);
      setMname(updateState?.name);
      setDept(updateState?.department);
      setDesgn(updateState?.designation);
      setPhone(updateState?.phone);
      setEmail(updateState?.email);
      setImage_url(updateState?.image_url);
      setFrom(Date.parse(updateState?.from));
      setTo(Date.parse(updateState?.to));
    }
  }, [updateState]);

  const handleAddMember = async () => {
    toast.promise(fetchUploadFile(file), {
      loading: "Uploading...",
      success: (res) => {
        setImage_url(res.data.url);
        const postBody = {
          position: pos,
          name: mname,
          department: dept,
          designation: desgn,
          phone: phone,
          email: email,
          image_url: res.data.url,
          from: from.toISOString(),
          to: to.toISOString(),
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
    if (file) {
      toast.promise(fetchUploadFile(file), {
        loading: "Uploading...",
        success: (res) => {
          setImage_url(res.data.url);
          const postBody = {
            position: pos,
            name: mname,
            department: dept,
            designation: desgn,
            phone: phone,
            email: email,
            image_url: res.data.url,
            from: from.toISOString(),
            to: to.toISOString(),
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
        position: pos,
        name: mname,
        department: dept,
        designation: desgn,
        phone: phone,
        email: email,
        from: from.toISOString(),
        to: to.toISOString(),
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
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4">
          <Dropdown
            valueState={[pos, setPos]}
            title="Position"
            placeholder="Select a Position"
            options={[
              "Faculty",
              "Student",
            ]}
          />
          <Inputfield
            valueState={[mname, setMname]}
            title="Member Name"
            placeholder="Enter the name of the member"
          />
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          <Dropdown
            valueState={[dept, setDept]}
            title="Department"
            placeholder="Select a Department"
            options={departments}
          />
          <Inputfield
            valueState={[desgn, setDesgn]}
            title="Designation / Year of study"
            placeholder="Enter the name of the Club"
          />
          <FileUpload
            title="Member Photo"
            fileState={[file, setFile]}
            url={image_url}
          />
        </div>
        <div className="flex items-center w-full space-x-4 mt-4">
          <Inputfield
            valueState={[phone, setPhone]}
            title="Phone Number"
            placeholder="Enter Phone Number"
          />
          <Inputfield
            valueState={[email, setEmail]}
            title="Email"
            placeholder="Enter Email ID"
          />
          <DateInput
            startTitle="From"
            endTitle="To"
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
              <Button className="w-3/4" text={"Update Member"} handleClick={handleUpdateMember} />
              <Button className="w-3/4" text={"Cancel Update"} handleClick={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddMember;
