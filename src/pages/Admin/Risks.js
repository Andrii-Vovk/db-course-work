import React, { useState, useEffect } from "react";

import insuranceProposals from "../../api/insuranceProposals";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const Risks = () => {
  return (
    <div>
      {
        <Table
          title="Ризики"
          refreshable
          columns={[
            { title: "Назва", field: "name" },
            { title: "Опис", field: "description" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return insuranceProposals.deleteRisksNames(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceProposals
                .putRisksNames(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return insuranceProposals.createRisksNames(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              insuranceProposals
                .getRisksNames()
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
      }
    </div>
  );
};

export default Risks;
