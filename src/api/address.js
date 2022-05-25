import axios from "./index";
import { routes } from "./routes";

const address = {
  getCities: () => {
    return axios.get(`${routes.address}/cities`);
  },

  getCitiesById: (id) => {
    return axios.get(`${routes.address}/cities/${id}`);
  },

  putCities: (id, data) => {
    return axios.put(`${routes.address}/cities/${id}`, data);
  },

  createCities: (data) => {
    return axios.post(`${routes.address}/cities`, data);
  },

  deleteCities: (id) => {
    return axios.delete(`${routes.address}/cities/${id}`);
  },

  getCountries: () => {
    return axios.get(`${routes.address}/coutries`);
  },

  getCountriesFull: () => {
    return axios.get(`${routes.address}/coutries/full`);
  },

  getCountriesById: (id) => {
    return axios.get(`${routes.address}/coutries/${id}`);
  },

  putCountries: (id, data) => {
    return axios.put(`${routes.address}/coutries/${id}`, data);
  },

  createCountries: (data) => {
    return axios.post(`${routes.address}/coutries`, data);
  },

  deleteCountries: (id) => {
    return axios.delete(`${routes.address}/coutries/${id}`);
  },

  getRegions: () => {
    return axios.get(`${routes.address}/regions`);
  },

  getRegionsById: (id) => {
    return axios.get(`${routes.address}/regions/${id}`);
  },

  putRegions: (id, data) => {
    return axios.put(`${routes.address}/regions/${id}`, data);
  },

  createRegions: (data) => {
    return axios.post(`${routes.address}/regions`, data);
  },

  deleteRegions: (id) => {
    return axios.delete(`${routes.address}/regions/${id}`);
  },
};

export default address;
