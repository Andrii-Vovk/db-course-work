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
    return axios.delete(`${routes.documents}/${id}`);
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

  addFieldNames: (data) => {
    return axios.post(`${routes.documents}/field-names`, data);
  },

  putFieldNames: (id, data) => {
    return axios.put(`${routes.documents}/field-names/${id}`, data);
  },

  deleteFieldNames: (id) => {
    return axios.delete(`${routes.documents}/field-names/${id}`);
  },

  getDocumentTypes: () => {
    return axios.get(`${routes.documents}/types`);
  },

  putDocumentTypes: (id, data) => {
    return axios.put(`${routes.documents}/types/${id}`, data);
  },

  createDocumentTypes: (data) => {
    return axios.post(`${routes.documents}/types`, data);
  },

  deleteDocumentTypes: (id) => {
    return axios.delete(`${routes.documents}/types/${id}`);
  },
};

export default documents;
