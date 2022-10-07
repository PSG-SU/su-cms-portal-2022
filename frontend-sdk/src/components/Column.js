import React, { useState } from "react";
import {
  AiFillExclamationCircle,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Column = ({
  valueState = ["", (v) => { }],
  errorState = ["", (v) => { }],
  value = "",
  
}) => {

  return (
    <div>

      <td class="p-2">
        <div class="font-medium text-gray-800">
          {value}
        </div>
      </td>
  
    </div>
 

  );
};


export default Column;
