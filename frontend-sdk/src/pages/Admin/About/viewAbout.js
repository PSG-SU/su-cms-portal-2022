import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';

const ViewAbout = () => {
  const [content, setContent] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/about")
      .then((res) => {
        console.log(res.data);
        setContent(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <section className="px-8 py-8 w-full">
      <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-auto">
        <div className="flex items-center w-full space-x-4 mt-4">
          <Heading>View About</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-4">
          {content[0]?.content}
        </div>

        <div className="flex items-center w-full space-x-4 mt-12">
          <Heading>SU by Law</Heading>
        </div>

        <div className="flex items-center w-full space-x-4 mt-8">
          {content && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={content[0]?.file_url}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          )}

          {!content && <>Unable to load file!</>}

        </div>

      </div>
    </section>
  );
};

export default ViewAbout;
