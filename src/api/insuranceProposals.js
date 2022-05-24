import axios from "./index";
import { routes } from "./routes";

const proposals = {
  getInsuranceProposals: () => {
    return axios.get(`${routes.insuranceProposals}/insurance-proposals`);
  },

  getInsuranceProposalsById: (id) => {
    return axios.get(`${routes.insuranceProposals}/insurance-proposals/${id}`);
  },

  putInsuranceProposals: (id, data) => {
    return axios.put(
      `${routes.insuranceProposals}/insurance-proposals/${id}`,
      data
    );
  },

  createInsuranceProposals: (data) => {
    return axios.post(`${routes.insuranceProposals}/insurance-proposals`, data);
  },

  deleteInsuranceProposals: (id) => {
    return axios.delete(`${routes.insuranceProposals}/insurance-proposals/${id}`);
  },

  getTypes: () => {
    return axios.get(`${routes.insuranceProposals}/policy-types`);
  },

  getRisks: () => {
    return axios.get(`${routes.insuranceProposals}/risks`);
  },

  putRiskProposal: (id, data) => {
    return axios.put(
      `${routes.insuranceProposals}/risk-insurance-proposal/${id}`,
      data
    );
  },

  createRiskProposal: (data) => {
    return axios.post(`${routes.insuranceProposals}/risk-insurance-proposal`, data);
  },

  deleteRiskProposal: (id) => {
    return axios.delete(`${routes.insuranceProposals}/risk-insurance-proposal/${id}`);
  },
};

export default proposals;
