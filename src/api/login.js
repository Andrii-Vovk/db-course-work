import axios from "./index";

import {routes} from "./routes";

const login = {
  signIn: (login, password) => {
    return axios.post(`${routes.login}?login=${login}&password=${password}`);
  },
};

export default login;
