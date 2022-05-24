import axios from "./index";
import { routes } from "./routes";

const incidents = {
  getIncidents: () => {
    return axios.get(`${routes.incidents}`);
  },

  getIncidentsById: (id) => {
    return axios.get(`${routes.incidents}/${id}`);
  },

  putIncidents: (id, data) => {
    return axios.put(`${routes.incidents}/${id}`, data);
  },

  createIncidents: (data) => {
    return axios.post(`${routes.incidents}`, data);
  },

  deleteIncidents: (id) => {
    return axios.put(`${routes.incidents}/${id}`);
  },

  getIncidentsStatuses: () => {
    return axios.get(`${routes.incidents}/statuses`);
  },

  getIncidentsStatusesById: (id) => {
    return axios.get(`${routes.incidents}/statuses/${id}`);
  },

  putIncidentsStatuses: (id, data) => {
    return axios.put(`${routes.incidents}/statuses/${id}`, data);
  },

  createIncidentsStatuses: (data) => {
    return axios.post(`${routes.incidents}/statuses`, data);
  },

  deleteIncidentsStatuses: (id) => {
    return axios.put(`${routes.incidents}/statuses/${id}`);
  },

  getReimbursements: () => {
    return axios.get(`${routes.incidents}/reimbursements`);
  },

  getReimbursementsById: (id) => {
    return axios.get(`${routes.incidents}/reimbursements/${id}`);
  },

  putReimbursements: (id, data) => {
    return axios.put(`${routes.incidents}/reimbursements/${id}`, data);
  },

  createReimbursements: (data) => {
    return axios.post(`${routes.incidents}/reimbursements`, data);
  },

  deleteReimbursements: (id) => {
    return axios.put(`${routes.incidents}/reimbursements/${id}`);
  },

  getIncidentReviews: () => {
    return axios.get(`${routes.incidents}/reviews`);
  },

  getIncidentReviewsById: (id) => {
    return axios.get(`${routes.incidents}/reviews/${id}`);
  },

  putIncidentReviews: (id, data) => {
    return axios.put(`${routes.incidents}/reviews/${id}`, data);
  },

  createIncidentReviews: (data) => {
    return axios.post(`${routes.incidents}/reviews`, data);
  },

  deleteIncidentReviews: (id) => {
    return axios.put(`${routes.incidents}/reviews/${id}`);
  },

  getStatuses: () => {
    return axios.get(`${routes.incidents}/statuses`);
  },

  getStatusesById: (id) => {
    return axios.get(`${routes.incidents}/statuses/${id}`);
  },

  putStatuses: (id, data) => {
    return axios.put(`${routes.incidents}/statuses/${id}`, data);
  },

  createStatuses: (data) => {
    return axios.post(`${routes.incidents}/statuses`, data);
  },

  deleteStatuses: (id) => {
    return axios.put(`${routes.incidents}/statuses/${id}`);
  },
};

export default incidents;
