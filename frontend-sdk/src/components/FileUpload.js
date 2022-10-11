import React, {useState} from "react";
// import 
import { AiFillExclamationCircle } from "react-icons/ai";

const FileUpload = (fileState, fileErrorState = [null, () => {}]) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const dataForm = new FormData();
    dataForm.append("file", file);

    // upload to server
    //   API.post(SUBMISSION_FILE_UPLOAD, dataForm, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //     .then((res) => {
    //       const data = res.data.data;

    //       API.post(SUBMISSION_UPDATE_DRAFT, {
    //         id: draft.id,
    //         fileUpload: data.id,
    //       })
    //         .then((res) => {
    //           setFile(data);
    //           setDraft({ ...draft, ...{ fileUpload: data } });
    //         })
    //         .catch((err) => {
    //           // console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         if (err.response.status === 400) {
    //           setFileError(err.response.data.message);
    //         }
    //       }
    //     });
  };
  return (
    <React.Fragment>
      <div className="bg-cloud rounded-lg w-full p-6 flex">
        <label className="cursor-pointer bg-dark-gray px-6 py-2 rounded-lg shadow-md text-white h-fit inline-block ">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e)}
          />
          File Upload
        </label>
        {file && (
          <div className="flex-1 px-6">
            Uploaded {/* <Link to=> */}
            <button>
              <span className="text-aqua hover:underline">{file.fileName}</span>
            </button>
            {/* </Link> */}
          </div>
        )}
      </div>
      {fileError.length !== 0 && (
        <div className="flex items-center space-x-2 text-xs text-red">
          <AiFillExclamationCircle />
          <p className="">{fileError}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default FileUpload;
