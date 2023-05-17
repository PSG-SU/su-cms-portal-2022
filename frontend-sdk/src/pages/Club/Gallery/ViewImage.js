/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { fetchGetClubGallery, fetchGetGallery } from "../../../API/calls";
import { CLUB_GALLERY_URL, GALLERY_URL } from "../../../API/config";
import Heading from "../../../components/Heading";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";

const ViewImage = () => {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [deptyos, setDeptyos] = useState("");
  const [acayear, setAcayear] = useState("");

  const [data, setData] = useState([]);

  const { refreshToken } = useContext(RefreshContext);

  useEffect(() => {

    fetchGetClubGallery().then(res => {
      console.log(res.data.message);
      setData(res.data.message)
    }).catch(err => {
      console.log(err);
      toast.error(`Error: ${err}`);
    });
  }, [refreshToken]);

  return (
    <section className="px-8 py-8 w-full">
      <Heading>View Images</Heading>
      <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)] overflow-uto">
        <Table
          theads={["Event", "Image"]}
          tdata={data}
          tkeys={["event", "image_url"]}
          className={`${data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
            } w-full`}
          hideUpdate
          url={CLUB_GALLERY_URL}
        />
      </div>
    </section>
  );
};

export default ViewImage;
