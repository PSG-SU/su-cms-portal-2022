import axios from "axios";
import { AUTH_URL, LOGIN_URL, OFFICE_BEARERS_URL, UPLOAD_URL, CLUB_URL, SUTEAM_URL, ABOUT_URL, NSS_NCC_URL, GENERAL_URL } from "./config";
import imageCompression from 'browser-image-compression';

const ABOUT_ID = "6355381dcef8729cb955e396";

async function handleImageUpload(img) {
  const imageFile = img
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  return imageCompression(imageFile, options)

};

export const fetchUploadFile = async (file) => {
  console.log("DE", file);
  if (file.type === "image/jpeg" || file.type === "image/png") {
    await handleImageUpload(file).then(res => {
      console.log(res)
      file = new File([res], res.name, { type: res.type });
      console.log(file)
    });
  }
  let data = new FormData();
  data.append("file", file);
  return axios.post(UPLOAD_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// For Auth
export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});
export const fetchAddUser = (postBody) =>
  axios.post(`${AUTH_URL}/add`, postBody, {});
export const fetchGetUser = () => axios.get(`${AUTH_URL}`, {});

// For OFFICE BEARERS
export const fetchAddOfficeBearers = (postBody) =>
  axios.post(`${OFFICE_BEARERS_URL}/add`, postBody, {});

export const fetchUpdateOfficeBearers = (postBody, id) =>
  axios.put(`${OFFICE_BEARERS_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For CLUBS
export const fetchAddClubs = (postBody) =>
  axios.post(`${CLUB_URL}/add`, postBody, {});

export const fetchUpdateClubs = (postBody, id) =>
  axios.put(`${CLUB_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For SU Team
export const fetchAddSUTeamStaff = (postBody) =>
  axios.post(`${SUTEAM_URL}/add`, postBody, {});

export const fetchUpdateSUTeamStaff = (postBody, id) =>
  axios.put(`${SUTEAM_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For About Page
export const fetchUpdateAbout = (postBody) =>
  axios.put(`${ABOUT_URL}/update/${ABOUT_ID}`, postBody, {});
/* ------------------------------------------- */

// For NSS NCC Page
export const fetchAddNssNcc = (postBody) =>
  axios.post(`${NSS_NCC_URL}/add`, postBody, {});

export const fetchUpdateNssNcc = (postBody, id) =>
  axios.put(`${NSS_NCC_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For Club - General Page
export const fetchAddGeneral = (postBody) =>
  axios.post(`${GENERAL_URL}/add`, postBody, {});
/* ------------------------------------------- */
