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
  REPORT_URL,
  SPOTLIGHT_URL,
  BUGS_URL,
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

// const loginUser = localStorage.getItem('userId');

// For Auth
export const fetchLogin = (postBody) => axios.post(LOGIN_URL, postBody, {});
export const fetchAddUser = (postBody) =>
  axios.post(`${AUTH_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchUpdateUser = (postBody, id) =>
  axios.put(`${AUTH_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchGetAllUsers = () => axios.get(`${AUTH_URL}`, {});
export const fetchGetUser = (id) => axios.get(`${AUTH_URL}/unique/${id}`, {});
export const fetchChangePassword = (postBody, id) =>
  axios.put(`${AUTH_URL}/changePassword/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For OFFICE BEARERS
export const fetchAddOfficeBearers = (postBody) =>
  axios.post(`${OFFICE_BEARERS_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchUpdateOfficeBearers = (postBody, id) =>
  axios.put(`${OFFICE_BEARERS_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For CLUBS
export const fetchAddClubs = (postBody) =>
  axios.post(`${CLUB_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchUpdateClubs = (postBody, id) =>
  axios.put(`${CLUB_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For SU Team
export const fetchAddSUTeamStaff = (postBody) =>
  axios.post(`${SUTEAM_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchUpdateSUTeamStaff = (postBody, id) =>
  axios.put(`${SUTEAM_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For Announcements
export const fetchAddAnnouncement = (postBody) =>
  axios.post(`${ANNOUNCEMENTS_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchUpdateAnnouncement = (postBody, id) =>
  axios.put(`${ANNOUNCEMENTS_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For About Page
export const fetchUpdateAbout = (postBody) =>
  axios.put(`${ABOUT_URL}/update`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For NSS NCC Page
export const fetchAddNssNcc = (postBody) =>
  axios.post(`${NSS_NCC_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchUpdateNssNcc = (postBody, id) =>
  axios.put(`${NSS_NCC_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For Gallery Page
export const fetchAddGallery = (postBody) =>
  axios.post(`${GALLERY_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchGetGalleryByEvent = (event) =>
  axios.get(`${GALLERY_URL}/event/${event}`, {});

export const fetchGetGallery = () =>
  axios.get(`${GALLERY_URL}`, {});

export const fetchUpdateGallery = (postBody, id) =>
  axios.put(`${GALLERY_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});

/* ------------------------------------------- */

// For Club - General Page
export const fetchAddGeneral = (postBody) =>
  axios.post(`${GENERAL_URL}/add`, postBody, {});
export const fetchUpdateGeneral = (postBody, user) =>
  axios.put(`${GENERAL_URL}/update/${user}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For Club - Team Member Page
export const fetchAddTeamMember = (postBody) =>
  axios.post(`${TEAM_MEMBER_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchUpdateTeamMember = (postBody, id) =>
  axios.put(`${TEAM_MEMBER_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For Club - Proposal Page
export const fetchAddProposal = (postBody) =>
  axios.post(`${PROPOSAL_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchUpdateProposal = (postBody, id) =>
  axios.put(`${PROPOSAL_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchGetApprovedorPublishedProposal = (user) =>
  axios.get(`${PROPOSAL_URL}/deanApprovedAndPublished/${user}`, {});
export const fetchGetProposalbyId = (id) =>
  axios.get(`${PROPOSAL_URL}/${id}`, {});

export const fetchGetDateRangeProposals = (postBody, user) =>
  axios.post(`${PROPOSAL_URL}/date-range-club/${user}`, postBody, {})
export const fetchGetAllDateRangeProposals = (postBody) =>
  axios.post(`${PROPOSAL_URL}/date-range-all`, postBody, {})
/* ------------------------------------------- */

// For Club - Event Report Page 

export const fetchAddEventReport = (postBody) =>
  axios.post(`${REPORT_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchUpdateEventReport = (postBody, id) =>
  axios.put(`${REPORT_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});

export const fetchGetEventReportByProposalId = (proposalID) =>
  axios.get(`${REPORT_URL}/from-proposal/${proposalID}`, {});
export const fetchGetEventReportById = (id) =>
  axios.get(`${REPORT_URL}/${id}`, {});
export const fetchGetEventReportByUser = (user) =>
  axios.get(`${REPORT_URL}/user/${user}`, {});
export const fetchGetAllEventReports = () =>
  axios.get(`${REPORT_URL}`, {});

export const fetchGetDateRangeEventReports = (postBody, user) =>
  axios.post(`${REPORT_URL}/date-range-club/${user}`, postBody, {});
export const fetchGetAllDateRangeEventReports = (postBody) =>
  axios.post(`${REPORT_URL}/date-range-all`, postBody, {});
/* ------------------------------------------- */

// For Bug Reports Page

export const fetchAddBug = (postBody) =>
  axios.post(`${BUGS_URL}/add`, { ...postBody, login: localStorage.getItem('userId') }, {});
export const fetchUpdateBug = (postBody, id) =>
  axios.put(`${BUGS_URL}/update/${id}`, { ...postBody, login: localStorage.getItem('userId') }, {});
/* ------------------------------------------- */

// For Spotlight 
export const fetchGetSpotlight = () =>
  axios.get(`${SPOTLIGHT_URL}`, {});
export const fetchAddSpotlight = (postBody) =>
  axios.post(`${SPOTLIGHT_URL}/add`, postBody, {});

