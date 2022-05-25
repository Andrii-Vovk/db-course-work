import React, { useState, useEffect } from "react";

import contractsAPI from "../../api/contracts";
import bankCredentialsAPI from "../../api/bankCredentials";
import Table from "../../components/Table";

import { message, Spin } from "antd";
import SalaryInfo from "./SalaryInfo";

const ContractsTable = ({ contracts, employeeId }) => {
  const [policyBonuses, setPolicyBonuses] = useState(null);
  const [positions, setPositions] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [data, setData] = useState(contracts ?? []);

  useEffect(() => {
    contractsAPI.getPolicyBonuses().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [
          item.id,
          `${item.minimumSum} - ${item.bonusPercentage}%`,
        ])
      );
      setPolicyBonuses(formattedData);
    });

    contractsAPI.getPositions().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setPositions(formattedData);
    });

    bankCredentialsAPI.getBankCredentials().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.iban])
      );
      setCredentials(formattedData);
    });
  }, []);

  return (
    <div>
      <SalaryInfo employeeId={employeeId} />
      {policyBonuses && positions ? (
        <Table
          title={`Контракти`}
          columns={[
            {
              title: "Посада",
              field: "positionId",
              lookup: positions,
            },
            {
              title: "Бонус",
              field: "policyBonusId",
              lookup: policyBonuses,
            },
            {
              title: "Рахунок",
              field: "salaryCredentialsId",
              lookup: credentials,
            },
            { title: "Деталі найму", field: "employmentDetails" },
            {
              title: "Початок роботи",
              field: "employmentStart",
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
            {
              title: "кінець роботи",
              field: "employmentEnd",
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
          ]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return contractsAPI.getContracts(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return contractsAPI
                .putContracts(localData.id, localData)
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
              formattedData.employeeId = employeeId;
              setData([...data, formattedData]);
              return contractsAPI.createContracts(formattedData);
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

export default ContractsTable;
