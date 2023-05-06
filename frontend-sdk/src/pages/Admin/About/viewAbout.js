import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ABOUT_URL } from "../../../API/config";

const ViewAbout = () => {
  const [details, setDetails] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    axios
      .get(ABOUT_URL)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto text-justify">
        <div className="flex items-center w-full space-x-4 mt-4">
          <Heading>View Details</Heading>
        </div>

        <p className="font-semibold mt-4">Tagline</p>
        <div className="flex items-center w-full space-x-8">
          {details?.tagline}
          <div className="ml-8 w-1/2">
            <p className="font-semibold">Number of Schemes: {details?.numberOfSchemes}</p>
            <p className="font-semibold">Number of Wings: {details?.numberOfWings}</p>
          </div>
        </div>

        <p className="font-semibold mt-8">About Us - Students Union</p>
        <div className="flex items-center w-full space-x-4">
          {details?.content}
        </div>

        <div className="flex items-center w-full space-x-8 mt-8">
          <div>
            <p className="font-semibold">Our Mission</p>
            {details?.ourMission}
          </div>
          <div>
            <p className="font-semibold">Our Plan</p>
            {details?.ourPlan}
          </div>
          <div>
            <p className="font-semibold">Our Vision</p>
            {details?.ourVision}
          </div>
        </div>

        <p className="font-semibold mt-8">About the College</p>
        <div className="flex items-center w-full space-x-4">
          {details?.aboutCollege}
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>SU by Law</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-8">
          {details && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={details?.file_url}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          )}

          {!details && <>Unable to load file!</>}

        </div>

      </div>
    </section>
  );
};

export default ViewAbout;
