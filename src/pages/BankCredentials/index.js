import React, { useState, useEffect } from "react";

import bankCredentials from "../../api/bankCredentials";
import Table from "../../components/Table";

import { Card, message, Spin } from "antd";

const BankCredentials = () => {
  return (
    <div>
      {
        <Table
          title="Банківські картки"
          refreshable
          columns={[
            { title: "ІБАН", field: "iban" },
            { title: "Номер картки", field: "cardNumber" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return bankCredentials.getBankCredentials(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return bankCredentials
                .putBankCredentials(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              newData.id = 0;
              return bankCredentials.createBankCredentials(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              bankCredentials
                .getBankCredentials()
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

export default BankCredentials;
