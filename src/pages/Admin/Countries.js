import React, { useState, useEffect } from "react";

import address from "../../api/address";
import Table from "../../components/Table";

import { message, Spin, Card } from "antd";
import Regions from "./Regions";

const Countries = () => {
  return (
    <div>
      {
        <Table
          title="Країни"
          refreshable
          columns={[{ title: "Назва", field: "name" }]}
          editable={{
            onRowDelete: (oldData) => {
              return address.deleteCountries(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return address
                .putCountries(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return address.createCountries(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          detailPanel={(rowData) => (
            <Card>
              <Regions regions={rowData.regions} countryId={rowData.id} />
            </Card>
          )}
          data={(query) => {
            return new Promise((resolve, reject) => {
              address
                .getCountriesFull()
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

export default Countries;
