import React, { useState, useEffect } from "react";

import offices from "../../api/offices";
import address from "../../api/address";
import Table from "../../components/Table";

import { message, Spin, Card } from "antd";

const Offices = () => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    address.getCities().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setCities(formattedData);
    });
  }, []);

  return (
    <div>
      {
        <Table
          title="Офіси"
          refreshable
          columns={[
            { title: "Місткість", field: "officeCapacity" },
            { title: "Місто", field: "cityId", lookup: cities },
            { title: "Вулиця", field: "street" },
            { title: "Будинок", field: "building" },
            { title: "Квартира", field: "apartment" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return offices.deleteOffices(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return offices
                .putOffices(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              return offices.createOffices(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              offices
                .getOffices()
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

export default Offices;
