import React, { useState, useEffect } from "react";

import insuranceObjects from "../../api/insuranceObjects";
import Table from "../../components/Table";

import { message, Spin } from "antd";
import ObjectDetails from "./ObjectDetails";

const ObjectsTable = () => {
  const [types, setTypes] = useState(null);

  useEffect(() => {
    insuranceObjects.getInsuranceObjectsTypes().then((data) => {
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
          title="Об'єкти страхування"
          refreshable
          columns={[
            { title: "Назва", field: "name" },
            { title: "Опис", field: "description" },
            { title: "Ціна", field: "price" },
            { title: "Тип", field: "objectTypeId", lookup: types },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return insuranceObjects.deleteInsuranceObjects(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return insuranceObjects
                .putInsuranceObjects(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return insuranceObjects.createInsuranceObjects(newData);
            },
          }}
          detailPanel={(rowData) => (
            <ObjectDetails
              objectId={rowData.id}
              props={rowData.insuranceObjectProps}
            />
          )}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              insuranceObjects
                .getInsuranceObjects()
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

export default ObjectsTable;
