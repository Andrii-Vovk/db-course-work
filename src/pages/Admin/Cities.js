import React, { useState, useEffect } from "react";

import address from "../../api/address";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const Regions = ({ cities, regionId }) => {
  const [data, setData] = useState(cities ?? []);

  return (
    <div>
      {
        <Table
          title="Міста"
          refreshable
          columns={[{ title: "Назва", field: "name" }]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return address.deleteCities(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return address
                .putCities(localData.id, localData)
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
              formattedData.regionId = regionId;
              setData([...data, formattedData]);
              return address.createCities(formattedData);
            },
          }}
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
