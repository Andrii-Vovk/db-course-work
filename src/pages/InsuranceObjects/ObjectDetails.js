import React, { useState, useEffect } from "react";

import insuranceObjects from "../../api/insuranceObjects";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const ObjectDetails = ({ props, objectId }) => {
  const [propNames, setPropNames] = useState(null);
  const [data, setData] = useState(props ?? []);

  useEffect(() => {
    insuranceObjects.getPropNames().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setPropNames(formattedData);
    });
  }, []);

  return (
    <div>
      {propNames ? (
        <Table
          title={`Властивості`}
          columns={[
            { title: "Властивість", field: "propertyId", lookup: propNames },
            { title: "Значення", field: "value" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return insuranceObjects.deleteProps(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceObjects
                .putProps(localData.id, localData)
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
              formattedData.objectId = objectId;
              setData([...data, formattedData]);
              return insuranceObjects.postProps(formattedData);
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

export default ObjectDetails;
