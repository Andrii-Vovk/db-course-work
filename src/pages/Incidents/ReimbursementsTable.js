import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import incidents from "../../api/incidents";
import employeeAPI from "../../api/employee";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const Reimbursements = ({ reimbursements, incidentId }) => {
  const [employees, setEmployees] = useState([]);

  const [data, setData] = useState(reimbursements);

  const currentUserId = useSelector((state) => state.auth.id);

  useEffect(() => {
    employeeAPI.getEmployee().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.firstName} ${item.lastName}`])
      );
      setEmployees(formattedData);
    });
  }, []);

  return (
    <div>
      {employees ? (
        <Table
          title="Виплати"
          columns={[
            {
              title: "Бухгалтер",
              field: "employeeId",
              lookup: employees,
              editable: "never",
            },
            { title: "Сума", field: "reimbursementSum" },
            { title: "Номер транзакції", field: "transactionNumber" },
            {
              title: "Дата виплати",
              field: "transactionDate",
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
              return incidents.deleteReimbursements(oldData.id);
            },
            onRowAdd: (newData) => {
              let formattedData = { ...newData };
              console.log(incidentId);
              formattedData.incidentId = incidentId;
              formattedData.employeeId = currentUserId;
              setData([...data, formattedData]);
              return incidents.createReimbursements(formattedData);
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

export default Reimbursements;
