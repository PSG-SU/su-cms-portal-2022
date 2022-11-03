import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";
import ModalImage from "react-modal-image";
import toast from "react-hot-toast";
import { VscFilePdf } from "react-icons/vsc";

const MultipleFiles = ({
  fileState,
  fileErrorState = ["", (e) => { }],
  className = "",
  title = "",
  url = "",
  pdf = false,
}) => {
  const [fileError, setFileError] = fileErrorState;
  const [files, setFiles] = useState(FileList());


  useEffect(() => {
    
  }, [files]);

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
                multiple
                onChange={(e) => {
                  e.preventDefault();
                  console.log(e.target.files);
                  setFiles(e.target.files);
                  setFileError("");
                }}
              />
              <FiUpload />
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full flex-wrap">
        {
          Array.from(files).map(file => <FileItem file={file} />)
        }
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

const FileItem = ({file}) => {

  useEffect(() => {
    console.log(file);
  
  }, [file])
  
  return (
    <div className="flex items-center space-x-2">
      <div>
        <ModalImage
          className="w-12 h-12 rounded-full"
          small={URL.createObjectURL(file)}
          large={URL.createObjectURL(file)}
          alt="Image URL"
        />
      </div>
    </div>
  );
}

export default MultipleFiles;
