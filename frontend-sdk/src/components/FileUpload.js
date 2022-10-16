import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";

const FileUpload = ({
  fileState,
  fileErrorState = [null, () => {}],
  className = "",
  title = "",
}) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div
      className={`${className} flex flex-col items-start justify-center space-y-2 w-full overflow-x-hidden`}
    >
      <label className="text-blue text-base">{title}</label>
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
                onChange={(e) => {
                  e.preventDefault();
                  setFile(e.target.files[0]);
                  setFileError("");
                }}
              />
              <FiUpload />
            </label>
            {file && <p className="whitespace-pre-wrap">{file.name}</p>}
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
