import axios from "./index";
import { routes } from "./routes";

const employees = {
  getBankCredentials: () => {
    return axios.get(`${routes.bankCredentials}`);
  },

  getBankCredentialsById: (id) => {
    return axios.get(`${routes.bankCredentials}/${id}`);
  },

  putBankCredentials: (id, data) => {
    return axios.put(`${routes.bankCredentials}/${id}`, data);
  },

  createBankCredentials: (data) => {
    return axios.post(`${routes.bankCredentials}`, data);
  },

  deleteBankCredentials: (id) => {
    return axios.put(`${routes.bankCredentials}/${id}`);
  },
};

export default employees;
