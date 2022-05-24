import axios from "./index";
import { routes } from "./routes";

const documents = {
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

  addField: (data) => {
    return axios.post(`${routes.documents}/fields`, data);
  },

  putField: (documentId, data) => {
    return axios.put(`${routes.documents}/fields/${documentId}`, data);
  },

  deleteField: (documentId) => {
    return axios.delete(`${routes.documents}/fields/${documentId}`);
  },

  getFieldNames: () => {
    return axios.get(`${routes.documents}/field-names`);
  },

  getDocumentTypes: () => {
    return axios.get(`${routes.documents}/types`);
  },
};

export default documents;
