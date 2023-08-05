import axios from "axios";
import {
  AUTH_URL,
  LOGIN_URL,
  OFFICE_BEARERS_URL,
  UPLOAD_URL,
  CLUB_URL,
  SUTEAM_URL,
  ANNOUNCEMENTS_URL,
  ABOUT_URL,
  NSS_NCC_URL,
  GENERAL_URL,
  TEAM_MEMBER_URL,
  PROPOSAL_URL,
  GALLERY_URL,
  CLUB_GALLERY_URL,
  SPOTLIGHT_URL,
} from "./config";
import imageCompression from "browser-image-compression";

// const ABOUT_ID = "6355381dcef8729cb955e396";

async function handleImageUpload(img) {
  const imageFile = img;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  return imageCompression(imageFile, options);
}

export const fetchUploadFile = async (file) => {
  if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
    await handleImageUpload(file).then((res) => {
      file = new File([res], res.name, { type: res.type });
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
export const fetchUpdateUser = (postBody, id) =>
  axios.put(`${AUTH_URL}/update/${id}`, postBody, {});
export const fetchGetAllUsers = () => axios.get(`${AUTH_URL}`, {});
export const fetchGetUser = (id) => axios.get(`${AUTH_URL}/unique/${id}`, {});
export const fetchChangePassword = (postBody, id) =>
  axios.put(`${AUTH_URL}/changePassword/${id}`, postBody, {});
/* ------------------------------------------- */

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

// For Announcements
export const fetchAddAnnouncement = (postBody) =>
  axios.post(`${ANNOUNCEMENTS_URL}/add`, postBody, {});

export const fetchUpdateAnnouncement = (postBody, id) =>
  axios.put(`${ANNOUNCEMENTS_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For About Page
export const fetchUpdateAbout = (postBody) =>
  axios.put(`${ABOUT_URL}/update`, postBody, {});
/* ------------------------------------------- */

// For NSS NCC Page
export const fetchAddNssNcc = (postBody) =>
  axios.post(`${NSS_NCC_URL}/add`, postBody, {});

export const fetchUpdateNssNcc = (postBody, id) =>
  axios.put(`${NSS_NCC_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For Gallery Page
export const fetchAddGallery = (postBody) =>
  axios.post(`${GALLERY_URL}/add`, postBody, {});

export const fetchGetGalleryByEvent = (event) =>
  axios.get(`${GALLERY_URL}/event/${event}`, {});

export const fetchGetGallery = () =>
  axios.get(`${GALLERY_URL}`, {});

export const fetchUpdateGallery = (postBody, id) =>
  axios.put(`${GALLERY_URL}/update/${id}`, postBody, {});

/* ------------------------------------------- */

// For Club - General Page
export const fetchAddGeneral = (postBody) =>
  axios.post(`${GENERAL_URL}/add`, postBody, {});
export const fetchUpdateGeneral = (postBody, user) =>
  axios.put(`${GENERAL_URL}/update/${user}`, postBody, {});
/* ------------------------------------------- */

// For Club - Team Member Page
export const fetchAddTeamMember = (postBody) =>
  axios.post(`${TEAM_MEMBER_URL}/add`, postBody, {});
export const fetchUpdateTeamMember = (postBody, id) =>
  axios.put(`${TEAM_MEMBER_URL}/update/${id}`, postBody, {});
/* ------------------------------------------- */

// For Club - Proposal Page
export const fetchAddProposal = (postBody) =>
  axios.post(`${PROPOSAL_URL}/add`, postBody, {});
export const fetchUpdateProposal = (postBody, id) =>
  axios.put(`${PROPOSAL_URL}/update/${id}`, postBody, {});
export const fetchGetApprovedorPublishedProposal = (user) =>
  axios.get(`${PROPOSAL_URL}/deanApprovedAndPublished/${user}`, {});
export const fetchGetProposalbyId = (id) =>
  axios.get(`${PROPOSAL_URL}/${id}`, {});
/* ------------------------------------------- */

// For Club - Gallery Page 

export const fetchAddClubGallery = (postBody) =>
  axios.post(`${CLUB_GALLERY_URL}/add`, postBody, {});

export const fetchGetClubGalleryByEvent = (event) =>
  axios.get(`${CLUB_GALLERY_URL}/event/${event}`, {});

export const fetchGetClubGallery = () =>
  axios.get(`${CLUB_GALLERY_URL}`, {});


// For Spotlight 
export const fetchGetSpotlight = () =>
  axios.get(`${SPOTLIGHT_URL}`, {});
export const fetchAddSpotlight = (postBody) =>
  axios.post(`${SPOTLIGHT_URL}/add`, postBody, {});

