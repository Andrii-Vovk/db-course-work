import axios from "./index";
import { routes } from "./routes";

const policies = {
  getPolicies: () => {
    return axios.get(`${routes.policies}`);
  },

  getPoliciesById: (id) => {
    return axios.get(`${routes.policies}/${id}`);
  },

  putPolicies: (id, data) => {
    return axios.put(`${routes.policies}/${id}`, data);
  },

  createPolicies: (data) => {
    return axios.post(`${routes.policies}`, data);
  },

  deletePolicies: (id) => {
    return axios.put(`${routes.policies}/${id}`);
  },

  postDocuments: (data) => {
    return axios.post(`${routes.policies}/documents`, data);
  },

  putDocuments: (id, data) => {
    return axios.put(`${routes.policies}/documents/${id}`, data);
  },

  deleteDocuments: (id) => {
    return axios.put(`${routes.policies}/documents/${id}`);
  },

  getPoliciesPayments: () => {
    return axios.get(`${routes.policies}/payments`);
  },

  getPoliciesPaymentsById: (id) => {
    return axios.get(`${routes.policies}/payments/${id}`);
  },

  putPoliciesPayments: (id, data) => {
    return axios.put(`${routes.policies}/payments/${id}`, data);
  },

  createPoliciesPayments: (data) => {
    return axios.post(`${routes.policies}/payments`, data);
  },

  deletePoliciesPayments: (id) => {
    return axios.put(`${routes.policies}/payments/${id}`);
  },
};

export default policies;
