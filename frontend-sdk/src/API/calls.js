import axios from "axios";
import { AUTH_URL, LOGIN_URL, OFFICE_BEARERS_URL, UPLOAD_URL } from "./config";

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

// For Auth

export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});
export const fetchAddUser = (postBody) =>
  axios.post(`${AUTH_URL}/add`, postBody, {});
export const fetchGetUser = () => axios.get(`${AUTH_URL}`, {});
