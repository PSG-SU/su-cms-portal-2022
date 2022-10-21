import axios from "axios";
import { AUTH_URL, LOGIN_URL, OFFICE_BEARERS_URL, UPLOAD_URL, CLUB_URL, SUTEAM_URL, ABOUT_URL, NSS_NCC_URL } from "./config";

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

// For CLUBS
export const fetchAddClubs = (postBody) =>
  axios.post(`${CLUB_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For SU Team
export const fetchAddSUTeamStaff = (postBody) =>
  axios.post(`${SUTEAM_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For About Page
export const fetchAddAbout = (postBody) =>
  axios.post(`${ABOUT_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For NSS NCC Page
export const fetchAddNssNcc = (postBody) =>
  axios.post(`${NSS_NCC_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For Auth
export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});
export const fetchAddUser = (postBody) =>
  axios.post(`${AUTH_URL}/add`, postBody, {});
export const fetchGetUser = () => axios.get(`${AUTH_URL}`, {});
