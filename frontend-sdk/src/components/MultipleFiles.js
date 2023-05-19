import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";
import ModalImage from "react-modal-image";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import Button from "./Button";

const MultipleFiles = ({
  fileState,
  fileErrorState = ["", (e) => {}],
  className = "",
  title = "",
  urlState = [[], (e) => {}],
  pdf = false,
}) => {
  const [fileError, setFileError] = fileErrorState;
  const [files, setFiles] = fileState;
  const [fileName, setFileName] = useState("");
  const [fileURLs, setFileURLs] = urlState;

  useEffect(() => {
    setFileName(
      fileURLs && fileURLs.length > 0 ? (
        <div className="flex items-center w-full flex-wrap gap-2">
          {fileURLs.map((url, i) => (
            <FileItem
              key={i}
              url={url}
              onRemove={() => {
                setFileURLs(fileURLs.slice(0, i).concat(fileURLs.slice(i + 1)));
              }}
            />
          ))}
        </div>
      ) : files.length > 0 ? (
        ""
      ) : (
        "No file chosen"
      )
    );
  }, [fileURLs, files]);

  useEffect(() => {
    let initialFileLen = files.length;
    let currentFiles = files.filter(
      (file) =>
        (pdf && file.type === "application/pdf") ||
        (!pdf &&
          (file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png"))
    );
    if (initialFileLen === currentFiles.length) return;
    else {
      setFiles(currentFiles);
      pdf
        ? toast.error("Please upload valid PDF files")
        : toast.error("Please upload valid image files");
    }
  }, [files]);

  return (
    <div
      className={`${className} flex flex-col font-poppins items-start justify-center space-y-2 w-full overflow-x-hidden`}
    >
      <div className="flex flex-col">
        <label className="text-ming text-base">{title}</label>
        <label className="text-slate text-xs">*Max file size: 10MB</label>
      </div>
      <div className="flex space-x-2 items-center w-full">
        <div
          className={` px-4 py-2 w-full rounded-lg text-slate bg-gray bg-clip-padding bg-no-repeat border-2 border-solid ${
            fileError.length !== 0 ? "border-yellow" : "border-gray"
          } first-letter:transition ease-in-out m-0 focus:outline-none focus:border-cloud`}
        >
          <div className="w-full flex items-center space-x-6">
            <label className="bg-cloud p-3 rounded-lg w-fit whitespace-nowrap shadow-lg">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  e.preventDefault();
                  setFiles(files.concat(Array.from(e.target.files)));
                  setFileError("");
                }}
              />
              <FiUpload />
            </label>

            <div className="flex items-center w-full flex-wrap gap-2">
              <p className="whitespace-pre-wrap w-full">{fileName}</p>

              {files.map((file, i) => (
                <FileItem
                  file={file}
                  key={i}
                  onRemove={() => {
                    setFiles(files.slice(0, i).concat(files.slice(i + 1)));
                  }}
                />
              ))}
            </div>
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

const FileItem = ({ file, url = "", onRemove, key }) => {
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="flex items-center space-x-2 relative" key={key}>
      {((url &&
        url.length > 0 &&
        (url.endsWith(".png") ||
          url.endsWith(".jpg") ||
          url.endsWith(".jpeg"))) ||
        (file &&
          (file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"))) && (
        <React.Fragment>
          <button
            className="rounded-full bg-cloud absolute top-0 right-0 p-1 hover:text-gray z-40"
            onClick={(e) => onRemove()}
          >
            <IoCloseOutline />
          </button>
          <div>
            <ModalImage
              className="w-16 h-16 rounded-full "
              small={url.length > 0 ? url : URL.createObjectURL(file)}
              large={url.length > 0 ? url : URL.createObjectURL(file)}
              alt="Image URL"
            />
          </div>
        </React.Fragment>
      )}
      {((url && url.length > 0 && url.endsWith(".pdf")) ||
        (file && file.type === "application/pdf")) && (
        <React.Fragment>
          <button
            className="rounded-full bg-cloud absolute -top-1 -right-1 p-1 hover:text-gray z-40"
            onClick={(e) => onRemove()}
          >
            <IoCloseOutline />
          </button>
          <div>
            <Button
              text={
                <div className="flex flex-row items-center gap-2">
                  <VscFilePdf />
                  {file && <p className="text-xs">{file.name}</p>}
                </div>
              }
              handleClick={() => {
                url.length > 0
                  ? window.open(url, "_blank")
                  : window.open(URL.createObjectURL(file), "_blank");
              }}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MultipleFiles;
