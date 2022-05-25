import React, { useState, useEffect } from "react";

import documents from "../../api/documents";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const FieldNames = () => {
  return (
    <div>
      {
        <Table
          title="Назви полів документів"
          refreshable
          columns={[{ title: "Назва", field: "name" }]}
          editable={{
            onRowDelete: (oldData) => {
              return documents.deleteFieldNames(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return documents
                .putFieldNames(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return documents.addFieldNames(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              documents
                .getFieldNames()
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

export default FieldNames;
