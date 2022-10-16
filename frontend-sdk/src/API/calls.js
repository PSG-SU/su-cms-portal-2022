import axios from "axios";
import { LOGIN_URL, OFFICE_BEARERS_URL, UPLOAD_URL } from "./config";

export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});

export const fetchUploadFile = (file) => {
  let data = new FormData();
  data.append("file", file);
  return axios.post(UPLOAD_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// For OFFICE BEARERS

export const fetchAddOfficeBearers = (postBody) =>
  axios.post(`${OFFICE_BEARERS_URL}/add`, postBody, {});

/* ------------------------------------------- */
