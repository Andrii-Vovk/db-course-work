import axios from "./index";
import { routes } from "./routes";

const Offices = {
  getOffices: () => {
    return axios.get(`offices`);
  },

  getOfficesById: (id) => {
    return axios.get(`offices/${id}`);
  },

  putOffices: (id, data) => {
    return axios.put(`offices/${id}`, data);
  },

  createOffices: (data) => {
    return axios.post(`offices`, data);
  },

  deleteOffices: (id) => {
    return axios.put(`offices/${id}`);
  },
};

export default Offices;
