import React, { useState } from "react";
import {
  AiFillExclamationCircle,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const TextArea = ({
  valueState = ["", (v) => { }],
  errorState = ["", (v) => { }],
  placeholder = "",
  title = "",
  className = "w-full",
  disabled = false,
}) => {
  const [value, setValue] = valueState;
  const [error, setError] = errorState;

  return (
    <div className={`${className} flex flex-col items-start justify-center font-nunito space-y-2`}>
      <label className="text-dark-gray">{title}</label>
      <div className="flex space-x-2 items-center w-full">
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={disabled ? "None" : value}
          wrap="soft"
          rows="8"
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
            setError("");
          }}
          className={`h-32 px-4 py-2 w-full rounded-lg text-slate bg-gray bg-clip-padding bg-no-repeat border-2 border-solid ${error.length !== 0 ? "border-red" : "border-gray"
            } first-letter:transition ease-in-out m-0 focus:outline-none focus:border-mid-violet`}
        />
      </div>
      {error.length !== 0 && (
        <div className="flex items-center space-x-2 text-xs text-red">
          <AiFillExclamationCircle />
          <p className="">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextArea;
