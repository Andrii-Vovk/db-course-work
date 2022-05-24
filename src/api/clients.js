import axios from "./index";
import { routes } from "./routes";

const clients = {
  getClients: () => {
    return axios.get(`${routes.client}`);
  },
};

export default clients;
