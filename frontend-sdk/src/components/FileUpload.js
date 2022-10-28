import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";
import ModalImage from "react-modal-image";
import toast from "react-hot-toast";
import { VscFilePdf } from "react-icons/vsc";

const FileUpload = ({
  fileState,
  fileErrorState = ["", (e) => { }],
  className = "",
  title = "",
  url = "",
  pdf = false,
}) => {
  const [file, setFile] = fileState;
  const [fileError, setFileError] = fileErrorState;
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    console.log("UPLOAD", file);
    if (file) {
      if ((pdf && file.type === "application/pdf") || (!pdf && (file.type === "image/jpeg" || file.type === "image/png"))) {
        setFileName(file.name);
      } else {
        pdf ? toast.error("Please upload a valid PDF file") : toast.error("Please upload a valid image file");
      }
    }
  }, [file]);

  useEffect(() => {
    console.log("htdht", url)
    setFileName(
      url.length > 0 ? (
        <div className="flex items-center space-x-2">
          {pdf && (<VscFilePdf />)}

          {!pdf && (
            <div>
              <ModalImage
                className="w-12 h-12 rounded-full"
                small={url}
                large={url}
                alt="Image URL"
              />
            </div>
          )}
        </div>
      ) : (
        "No file chosen"
      )
    );
  }, [url]);

  return (
    <div
      className={`${className} flex flex-col items-start justify-center space-y-2 w-full overflow-x-hidden`}
    >
      <label className="text-blue text-base">{title}</label>
      <div className="flex space-x-2 items-center w-full">
        <div
          className={` px-4 py-2 w-full rounded-lg text-slate bg-gray bg-clip-padding bg-no-repeat border-2 border-solid ${fileError.length !== 0 ? "border-yellow" : "border-gray"
            } first-letter:transition ease-in-out m-0 focus:outline-none focus:border-cloud`}
        >
          <div className="w-full flex items-center space-x-6">
            <label className="bg-cloud p-3 rounded-lg w-fit whitespace-nowrap shadow-lg">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  e.preventDefault();
                  setFile(e.target.files[0]);
                  setFileError("");
                }}
              />
              <FiUpload />
            </label>
            <p className="whitespace-pre-wrap">{fileName}</p>
          </div>
        </div>
      </div>
      {fileError.length !== 0 && (
        <div className="flex items-center space-x-2 text-xs text-red">
          <AiFillExclamationCircle />
          <p className="">{fileError}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
