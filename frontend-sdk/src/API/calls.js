import axios from "axios";
import { AUTH_URL, LOGIN_URL, OFFICE_BEARERS_URL, UPLOAD_URL, CLUB_URL, SUTEAM_URL, ABOUT_URL, NSS_NCC_URL, GENERAL_URL } from "./config";
import imageCompression from 'browser-image-compression';

// async function handleImageUpload(img) {
//   const imageFile = img
//   console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
//   console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

//   const options = {
//     maxSizeMB: 1,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true
//   }
//   try {
//     const compressedFile = await imageCompression(imageFile, options);
//     console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
//     console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

//     await uploadToServer(compressedFile); // write your own logic
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchUploadFile = (file) => {
  // if (file.type === "image/jpeg" || file.type === "image/png") {
  //   handleImageUpload(file);
  // }

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
/* ------------------------------------------- */

// For About Page
export const fetchUpdateAbout = (postBody) =>
  axios.put(`${ABOUT_URL}/update/6355381dcef8729cb955e396`, postBody, {});
/* ------------------------------------------- */

// For NSS NCC Page
export const fetchAddNssNcc = (postBody) =>
  axios.post(`${NSS_NCC_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For Club - General Page
export const fetchAddGeneral = (postBody) =>
  axios.post(`${GENERAL_URL}/add`, postBody, {});
/* ------------------------------------------- */

// For Auth
export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});
export const fetchAddUser = (postBody) =>
  axios.post(`${AUTH_URL}/add`, postBody, {});
export const fetchGetUser = () => axios.get(`${AUTH_URL}`, {});
