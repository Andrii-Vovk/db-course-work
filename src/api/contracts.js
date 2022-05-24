import axios from "./index";
import { routes } from "./routes";

const contracts = {
  getContracts: () => {
    return axios.get(`${routes.contracts}`);
  },

  getContractsById: (id) => {
    return axios.get(`${routes.contracts}/${id}`);
  },

  putContracts: (id, data) => {
    return axios.put(`${routes.contracts}/${id}`, data);
  },

  createContracts: (data) => {
    return axios.post(`${routes.contracts}`, data);
  },

  deleteContracts: (id) => {
    return axios.put(`${routes.contracts}/${id}`);
  },

  getPositions: () => {
    return axios.get(`${routes.contracts}/positions`);
  },

  getPolicyBonuses: () => {
    return axios.get(`${routes.contracts}/bonuses`);
  },

  getPolicyBonusesById: (id) => {
    return axios.get(`${routes.contracts}/bonuses/${id}`);
  },

  putPolicyBonuses: (id, data) => {
    return axios.put(`${routes.contracts}/bonuses/${id}`, data);
  },

  createPolicyBonuses: (data) => {
    return axios.post(`${routes.contracts}/bonuses`, data);
  },

  deletePolicyBonuses: (id) => {
    return axios.put(`${routes.contracts}/bonuses/${id}`);
  },
};

export default contracts;
