import React, { useState, useEffect } from "react";

import insuranceObjects from "../../api/insuranceObjects";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const ObjectTypes = () => {
  return (
    <div>
      {
        <Table
          title="Властивості об'єктів"
          refreshable
          columns={[{ title: "Назва", field: "name" }]}
          editable={{
            onRowDelete: (oldData) => {
              return insuranceObjects.deletePropNames(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceObjects
                .putPropNames(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return insuranceObjects.postPropNames(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              insuranceObjects
                .getPropNames()
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

export default ObjectTypes;
