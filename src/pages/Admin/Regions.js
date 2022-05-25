import React, { useState, useEffect } from "react";

import address from "../../api/address";
import Table from "../../components/Table";

import { Card, message, Spin } from "antd";

import Cities from "./Cities";

const Regions = ({ regions, countryId }) => {
  const [data, setData] = useState(regions ?? []);

  return (
    <div>
      {
        <Table
          title="Регіони"
          refreshable
          columns={[{ title: "Назва", field: "name" }]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return address.deleteRegions(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return address
                .putRegions(localData.id, localData)
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
              formattedData.countryId = countryId;
              setData([...data, formattedData]);
              return address.createRegions(formattedData);
            },
          }}
          detailPanel={(rowData) => (
            <Card>
              <Cities cities={rowData.cities} regionId={rowData.id} />
            </Card>
          )}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={data}
        />
      }
    </div>
  );
};

export default Regions;
