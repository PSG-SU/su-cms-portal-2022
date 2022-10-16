import axios from "axios";
import { OFFICE_BEARERS_URL, UPLOAD_URL } from "./config";

export const uploadFile = (file) => {
  let data = new FormData();
  data.append("file", file);
  return axios.post(UPLOAD_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addOfficeBearers = (postBody) => {
  return axios.post(`${OFFICE_BEARERS_URL}/add`, postBody, {});
};
