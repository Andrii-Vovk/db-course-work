import axios from "./index";
import { routes } from "./routes";

const address = {
  getCities: () => {
    return axios.get(`${routes.address}/cities`);
  },
};

export default address;
