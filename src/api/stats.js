import axios from "./index";

const stats = {
  getThisYearPolicies: () => {
    return axios.get(`/stats/policies-this-year`);
  },

  getThisYearPolicyPrices: () => {
    return axios.get("/stats/policy-prices-this-year");
  },

  getProfit: () => {
    return axios.get("/stats/profit");
  },
};

export default stats;
