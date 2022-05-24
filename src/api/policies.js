import axios from "./index";
import { routes } from "./routes";

const policies = {
  getDocuments: () => {
    return axios.get(`${routes.documents}`);
  },

  getDocumentsById: (id) => {
    return axios.get(`${routes.documents}/${id}`);
  },

  putDocuments: (id, data) => {
    return axios.put(`${routes.documents}/${id}`, data);
  },

  createDocuments: (data) => {
    return axios.post(`${routes.documents}`, data);
  },

  deleteDocuments: (id) => {
    return axios.put(`${routes.documents}/${id}`);
  },
};

export default policies;
