import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import insuranceObjectsAPI from "../../api/insuranceObjects";
import insuranceProposalsAPI from "../../api/insuranceProposals";
import bankCredentialsAPI from "../../api/bankCredentials";
import clientsAPI from "../../api/clients";
import employeeAPI from "../../api/employee";

import policies from "../../api/policies";

import Table from "../../components/Table";
import PolicyDetails from "./PolicyDetails";

import { message, Spin } from "antd";

const PolicyTable = () => {
  const [insuranceObjects, setInsuranceObjects] = useState(null);
  const [insuranceProposals, setInsuranceProposals] = useState(null);
  const [bankCredentials, setBankCredentials] = useState(null);
  const [clientsData, setClientsData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  const currentUserId = useSelector((state) => state.auth.id);

  const position = useSelector((state) => state.auth.user.position);
  const isManager = () => ["manager", "admin"].includes(position.toLowerCase());

  useEffect(() => {
    insuranceObjectsAPI.getInsuranceObjects().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setInsuranceObjects(formattedData);
    });

    insuranceProposalsAPI.getInsuranceProposals().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setInsuranceProposals(formattedData);
    });

    bankCredentialsAPI.getBankCredentials().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.iban])
      );
      setBankCredentials(formattedData);
    });

    clientsAPI.getClients().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.firstName} ${item.lastName}`])
      );
      setClientsData(formattedData);
    });

    employeeAPI.getEmployee().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.firstName} ${item.lastName}`])
      );
      setEmployeeData(formattedData);
    });
  }, []);

  return (
    <div>
      {insuranceObjects &&
      insuranceProposals &&
      bankCredentials &&
      clientsData &&
      employeeData ? (
        <Table
          title="????????????"
          refreshable
          columns={[
            { title: "????????????", field: "clientId", lookup: clientsData },
            {
              title: "????????????????",
              field: "employeeId",
              lookup: employeeData,
              editable: "never",
            },
            {
              title: "???? ??????????????????",
              field: "insuranceObjectId",
              lookup: insuranceObjects,
            },
            {
              title: "???? ??????????????????",
              field: "insuranceProposalId",
              lookup: insuranceProposals,
            },
            {
              title: "????????",
              field: "bankCredentialsId",
              lookup: bankCredentials,
            },
            { title: "?????????? ????????????", field: "policyNumber" },
            {
              title: "???????? ????????????????????",
              field: "dateSigned",
              type: "date",
              dateSetting: {
                format: "dd/MM/yyyy",
              },
              editComponent: (props) => (
                <input
                  type="date"
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              ),
            },
          ]}
          editable={
            isManager() && {
              onRowDelete: (oldData) => {
                return policies.deletePolicies(oldData.id);
              },
              onRowUpdate: (newData, oldData) => {
                let localData = { ...newData };
                delete localData["tableData"];
                return policies
                  .putPolicies(localData.id, localData)
                  .catch((err) => {
                    message.error(err.response.data.message || err.message);
                  });
              },
              onRowAdd: (newData) => {
                newData.employeeId = currentUserId;
                return policies.createPolicies(newData);
              },
            }
          }
          detailPanel={(rowData) => {
            return (
              <PolicyDetails
                client={rowData.client}
                employee={rowData.employee}
                insuranceObject={rowData.insuranceObject}
                insuranceProposal={rowData.insuranceProposal}
                bankCredentials={rowData.bankCredentials}
                payments={rowData.policyPayments}
                incidents={rowData.incidents}
                docs={rowData.policyDocuments}
                policyId={rowData.id}
              />
            );
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              policies
                .getPolicies()
                .then((data) => {
                  resolve({
                    data: data.data,
                  });
                })
                .catch((err) => {
                  message.error(err.message);
                  resolve({
                    data: [],
                  });
                });
            });
          }}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default PolicyTable;
