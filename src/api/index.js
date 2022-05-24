import axios from "axios";

import { basePath } from "./routes";
import { store } from "../store/store";

const getToken = () => `Bearer ${store.getState().auth.jwtToken}`;

const instance = axios.create({
  baseURL: basePath,
});

instance.interceptors.request.use((request) => ({
  ...request,
  headers: {
    ...request.headers,
    Authorization: getToken(),
  },
}));

export default instance;
