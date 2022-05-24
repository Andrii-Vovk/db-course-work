import React, { useState } from "react";

import incidentsAPI from "../../api/incidents";
import Table from "../../components/Table";

import IncidentReviews from "./IncidentReviews";

import { message } from "antd";

const IncidentsTable = ({ incidents, policyId, insuranceProposal }) => {
  const [data, setData] = useState(incidents ?? []);

  const risks = Object.fromEntries(
    insuranceProposal.riskInsuranceProposals.map((risk) => [
      risk.risk.id,
      risk.risk.name,
    ])
  );

  return (
    <Table
      title={`Інциденти`}
      columns={[
        { title: "Ризик", field: "riskId", lookup: risks },
        { title: "Опис", field: "description" },
        {
          title: "Дата інциденту",
          field: "incidentDate",
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
          title: "Дата повідомлення",
          field: "dateReported",
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
      detailPanel={(rowdata) => (
        <>
          {console.log(rowdata)}
          <IncidentReviews
            incidentId={rowdata.id}
            incidentReviews={rowdata.incidentReviews}
          />
        </>
      )}
      editable={{
        onRowDelete: (oldData) => {
          setData(data.filter((row) => row.id !== oldData.id));
          return incidentsAPI.deleteIncidents(oldData.id);
        },
        onRowUpdate: (newData, oldData) => {
          let localData = { ...newData };
          delete localData["tableData"];
          return incidentsAPI
            .putIncidents(localData.id, localData)
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
          formattedData.policyId = policyId;
          setData([...data, formattedData]);
          return incidentsAPI.createIncidents(formattedData);
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
