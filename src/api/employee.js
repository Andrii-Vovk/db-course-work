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
};

export default employees;
