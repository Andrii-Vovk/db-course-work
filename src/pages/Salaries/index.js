import React, { useState, useEffect } from "react";

import contractsAPI from "../../api/contracts";
import employeeAPI from "../../api/employee";
import Table from "../../components/Table";

import { Card, message, Spin } from "antd";

const Salaries = () => {
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    contractsAPI.getContracts().then((data) => {
      console.log(typeof data.data[0].employmentEnd);
      const formattedData = Object.fromEntries(
        data.data.map((item) => [
          item.id,
          `${item.position.name}: ${
            new Date(item.employmentStart).toLocaleString().split(",")[0]
          } - ${new Date(item.employmentEnd).toLocaleString().split(",")[0]}`,
        ])
      );
      setContracts(formattedData);
    });

    employeeAPI.getEmployee().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.firstName} ${item.lastName}`])
      );
      setEmployees(formattedData);
    });
  }, []);

  return (
    <div>
      {contracts && employees ? (
        <Table
          title="Клієнти"
          refreshable
          columns={[
            { title: "Контракт", field: "contractId", lookup: contracts },
            { title: "Бухгалтер", field: "accountantId", lookup: employees },
            { title: "Номер транзакції", field: "transactionNumber" },
            { title: "Зарплата з бонусом", field: "totalSalary" },
            { title: "Бонус", field: "totalPolicyBonus" },
            {
              title: "Дата транзакції",
              field: "transactionDate",
              type: "date",
              format: "dd/MM/yyyy",
            },
          ]}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          detailPanel={(rowdata) => {
            return (
              <Card>
                <Card title={'Працівник'}>
                  <div>
                    <strong>
                      {rowdata.contract.employee.firstName}{" "}
                      {rowdata.contract.employee.lastName}
                    </strong>
                  </div>
                  <div>
                    <strong>{rowdata.contract.employee.email}</strong>
                  </div>
                  <div>
                    <strong>{rowdata.contract.employee.phoneNumber}</strong>
                  </div>
                </Card>
              </Card>
            );
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              employeeAPI
                .getSalary()
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

export default Salaries;
