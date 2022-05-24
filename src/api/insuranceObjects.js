import axios from "./index";
import { routes } from "./routes";

const objects = {
  getInsuranceObjects: () => {
    return axios.get(`${routes.insuranceObjects}`);
  },

  getInsuranceObjectsById: (id) => {
    return axios.get(`${routes.insuranceObjects}/${id}`);
  },

  putInsuranceObjects: (id, data) => {
    return axios.put(`${routes.insuranceObjects}/${id}`, data);
  },

  createInsuranceObjects: (data) => {
    return axios.post(`${routes.insuranceObjects}`, data);
  },

  deleteInsuranceObjects: (id) => {
    return axios.delete(`${routes.insuranceObjects}/${id}`);
  },

  getInsuranceObjectsTypes: () => {
    return axios.get(`${routes.insuranceObjects}/types`);
  },

  getPropNames: () => {
    return axios.get(`${routes.insuranceObjects}/props/names`);
  },

  postProps: (data) => {
    return axios.post(`${routes.insuranceObjects}/props`, data);
  },

  putProps: (id, data) => {
    return axios.put(`${routes.insuranceObjects}/props/${id}`, data);
  },

  deleteProps: (id) => {
    return axios.delete(`${routes.insuranceObjects}/props/${id}`);
  },
};

export default objects;
