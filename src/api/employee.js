import axios from "./index";
import { routes } from "./routes";

const employees = {
  getEmployee: () => {
    return axios.get(`${routes.employee}`);
  },

  getEmployeeById: (id) => {
    return axios.get(`${routes.employee}/${id}`);
  },

  putEmployee: (id, data) => {
    return axios.put(`${routes.employee}/${id}`, data);
  },

  createEmployee: (data) => {
    return axios.post(`${routes.employee}`, data);
  },

  deleteEmployee: (id) => {
    return axios.put(`${routes.employee}/${id}`);
  },

  checkSalary: (id) => {
    return axios.get(`/salary/employee/${id}/check`);
  },

  getSalary: () => {
    return axios.get(`/salary`);
  },

  paySalary: (id, accId) => {
    return axios.post(`/salary/employee/${id}?accountantId=${accId}`);
  },

  getOffices: () => {
    return axios.get(`${routes.offices}`);
  },

  getOfficesById: (id) => {
    return axios.get(`${routes.offices}/${id}`);
  },

  putOffices: (id, data) => {
    return axios.put(`${routes.offices}/${id}`, data);
  },

  createOffices: (data) => {
    return axios.post(`${routes.offices}`, data);
  },

  deleteOffices: (id) => {
    return axios.put(`${routes.offices}/${id}`);
  },
};

export default employees;
