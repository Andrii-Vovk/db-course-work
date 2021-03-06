import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import employee from "../../api/employee";
import Table from "../../components/Table";
import ContractsTable from "./ContractsTable";

import { Card, message, Spin } from "antd";

const Employees = () => {
  const [offices, setOffices] = useState(null);

  useEffect(() => {
    employee.getOffices().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.street}, ${item.city.name}`])
      );
      setOffices(formattedData);
    });
  }, []);

  const { position } = useSelector((state) => state.auth.user);

  return (
    <div>
      {offices ? (
        <Table
          title="Працівники"
          refreshable
          columns={[
            { title: "Логін", field: "login" },
            {
              title: "Пароль",
              field: "password",
            },
            { title: "Офіс", field: "officeId", lookup: offices },
            {
              title: "Стать",
              field: "gender",
              lookup: { true: "Чоловік", false: "Жінка" },
            },
            { title: "Ім'я", field: "firstName" },
            { title: "Прізвище", field: "lastName" },
            { title: "Телефон", field: "phoneNumber" },
            { title: "Email", field: "email" },
          ].filter(Boolean)}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          detailPanel={(rowData) => {
            return (
              <Card>
                <ContractsTable
                  employeeId={rowData.id}
                  contracts={rowData.contracts}
                />
              </Card>
            );
          }}
          editable={
            ["manager", "admin"].includes(position.toLowerCase()) && {
              onRowDelete: (oldData) => {
                return employee.deleteEmployee(oldData.id);
              },
              onRowUpdate: (newData, oldData) => {
                let localData = { ...newData };
                delete localData["tableData"];
                return employee
                  .putEmployee(localData.id, localData)
                  .catch((err) => {
                    message.error(err.response.data.message || err.message);
                  });
              },
              onRowAdd: (newData) => {
                return employee.createEmployee(newData);
              },
            }
          }
          data={(query) => {
            return new Promise((resolve, reject) => {
              employee
                .getEmployee()
                .then((data) => {
                  console.log(data);
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

export default Employees;
