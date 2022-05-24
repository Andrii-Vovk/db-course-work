import React, { useState, useEffect } from "react";

import insuranceProposals from "../../api/insuranceProposals";
import Table from "../../components/Table";

import { message, Spin } from "antd";
import ProposalDetails from "./ProposalDetails";

const ProposalsTable = () => {
  const [types, setTypes] = useState(null);

  useEffect(() => {
    insuranceProposals.getTypes().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setTypes(formattedData);
    });
  }, []);

  return (
    <div>
      {types ? (
        <Table
          title="Страхові пропозиції"
          columns={[
            { title: "Назва", field: "name" },
            { title: "Опис", field: "description" },
            { title: "Ціна", field: "price" },
            { title: "Тривалість (місяців)", field: "duration" },
            {
              title: "Тип",
              field: "policyTypeId",
              lookup: types,
            },
            {
              title: "Потрібен огляд",
              field: "preInsuranceExaminationRequired",
              lookup: { true: "Так", false: "Ні" },
            },
            {
              title: "Потрібен документ",
              field: "ownershipDocumentRequired",
              lookup: { true: "Так", false: "Ні" },
            },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return insuranceProposals.deleteInsuranceProposals(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceProposals
                .putInsuranceProposals(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return insuranceProposals.createInsuranceProposals(newData);
            },
          }}
          detailPanel={(rowData) => (
            <ProposalDetails
              proposalId={rowData.id}
              risks={rowData.riskInsuranceProposals}
            />
          )}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              insuranceProposals
                .getInsuranceProposals()
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

export default ProposalsTable;
