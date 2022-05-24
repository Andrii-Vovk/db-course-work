import axios from "./index";
import { routes } from "./routes";

const clients = {
  getClients: () => {
    return axios.get(`${routes.client}`);
  },

  editClient: (id, data) => {
    return axios.put(`${routes.client}/${id}`, data);
  },

  getOccupations: () => {
    return axios.get(`${routes.client}/occupations`);
  }
};

export default clients;
