import React, { useState, useEffect } from "react";

import clients from "../../api/clients";
import address from "../../api/address";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const Clients = () => {
  const [occupations, setOccupations] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    clients.getOccupations().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setOccupations(formattedData);
    });

    address.getCities().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setCities(formattedData);
    });
  }, []);

  return (
    <div>
      {occupations && cities ? (
        <Table
          title="Клієнти"
          refreshable
          columns={[
            { title: "Ім'я", field: "firstName" },
            { title: "Прізвище", field: "lastName" },
            { title: "Телефон", field: "phone" },
            { title: "Email", field: "email" },
            {
              title: "Стать",
              field: "gender",
              lookup: { true: "Чоловік", false: "Жінка" },
            },
            {
              title: "Дата народження",
              field: "birthDate",
              type: "date",
              dateSetting: {
                format: "dd/MM/yyyy",
              },
              editComponent: (props) => (
                <input
                  type="date"
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              ),
            },
            { title: "Професія", field: "occupation.id", lookup: occupations },
            { title: "Місто", field: "cityId", lookup: cities },
            { title: "Вулиця", field: "street" },
            { title: "Будівля", field: "building" },
            { title: "Квартира", field: "apartment" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              return clients.deleteClient(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return clients
                .editClient(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              newData.occupationId = newData.occupation.id;
              return clients.createClient(newData)
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              clients
                .getClients()
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

export default Clients;
