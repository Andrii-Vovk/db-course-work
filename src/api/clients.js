import axios from "./index";
import { routes } from "./routes";

const clients = {
  getClients: () => {
    return axios.get(`${routes.client}`);
  },

  editClient: (id, data) => {
    return axios.put(`${routes.client}/${id}`, data);
  },

  createClient: (data) => {
    return axios.post(`${routes.client}`, data);
  },

  deleteClient: (id) => {
    return axios.delete(`${routes.client}/${id}`);
  },

  getOccupations: () => {
    return axios.get(`${routes.client}/occupations`);
  },
};

export default clients;
