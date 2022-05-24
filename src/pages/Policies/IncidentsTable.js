import React, { useState, useEffect } from "react";

import policies from "../../api/policies";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const IncidentsTable = ({ incidents, policyId }) => {
  const [data, setData] = useState(incidents ?? []);

  return (
    <Table
      title={`Оплата`}
      columns={[
        { title: "Сума", field: "sum" },
        { title: "Номер Транзакції", field: "transactionNumber" },
        {
          title: "Дата",
          field: "date",
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
          return policies.deletePoliciesPayments(oldData.id);
        },
        onRowAdd: (newData) => {
          let formattedData = { ...newData };
          formattedData.policyId = policyId;
          setData([...data, formattedData]);
          return policies.createPoliciesPayments(formattedData);
        },
      }}
      options={{
        paging: false,
        search: false,
        sorting: false,
      }}
      data={data}
    />
  );
};

export default IncidentsTable;
