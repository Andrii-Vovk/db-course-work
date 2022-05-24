import React, { useState, useEffect } from "react";

import insuranceProposals from "../../api/insuranceProposals";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const ProposalDetails = ({ risks, proposalId }) => {
  const [riskNames, setRisknames] = useState(null);
  const [data, setData] = useState(risks);

  useEffect(() => {
    insuranceProposals.getRisks().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setRisknames(formattedData);
    });
  }, []);

  return (
    <div>
      {riskNames ? (
        <Table
          title={`Ризики`}
          columns={[
            { title: "Ризик", field: "riskId", lookup: riskNames },
            { title: "Покриття (грн)", field: "coverSum" },
            { title: "Франшиза (грн)", field: "franchise" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return insuranceProposals.deleteRiskProposal(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceProposals
                .putRiskProposal(localData.id, localData)
                .then((res) => {
                  setData([
                    ...data.filter((item) => item.id != localData.id),
                    localData,
                  ]);
                  return res;
                })
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              let formattedData = { ...newData };
              formattedData.insuranceProposalId = proposalId;
              setData([...data, formattedData]);
              return insuranceProposals.createRiskProposal(formattedData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={data}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default ProposalDetails;
