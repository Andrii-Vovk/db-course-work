import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import incidentsAPI from "../../api/incidents";
import employeeAPI from "../../api/employee";
import Table from "../../components/Table";

import { message } from "antd";

const ReviewsTable = ({ incidentId, incidentReviews }) => {
  const position = useSelector((state) => state.auth.user.position);
  const isManager = () => ["manager", "admin"].includes(position.toLowerCase());

  const [data, setData] = useState(incidentReviews ?? []);

  const [statuses, setStatuses] = useState(null);
  const [employees, setEmployees] = useState(null);

  const currentUserId = useSelector((state) => state.auth.id);

  useEffect(() => {
    employeeAPI.getEmployee().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, `${item.firstName} ${item.lastName}`])
      );
      setEmployees(formattedData);
    });

    incidentsAPI.getStatuses().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setStatuses(formattedData);
    });
  }, []);

  return (
    <Table
      title={`Оцінки Інцидентів`}
      columns={[
        {
          title: "Менеджер",
          field: "employeeId",
          lookup: employees,
          editable: "never",
        },
        { title: "Обгрунтування", field: "verdict" },
        { title: "Статус", field: "statusid", lookup: statuses },
        {
          title: "Дата приняття рішення",
          field: "dateReviewed",
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
      editable={
        isManager() && {
          onRowDelete: (oldData) => {
            setData(data.filter((row) => row.id !== oldData.id));
            return incidentsAPI.deleteIncidentReviews(oldData.id);
          },
          onRowUpdate: (newData, oldData) => {
            let localData = { ...newData };
            delete localData["tableData"];
            return incidentsAPI
              .putIncidentReviews(localData.id, localData)
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
            console.log(incidentId);
            formattedData.incidentId = incidentId;
            formattedData.employeeId = currentUserId;
            setData([...data, formattedData]);
            return incidentsAPI.createIncidentReviews(formattedData);
          },
        }
      }
      options={{
        paging: false,
        search: false,
        sorting: false,
      }}
      data={data}
    />
  );
};

export default ReviewsTable;
