import React, { useState, useEffect, useRef } from "react";

import incidents from "../../api/incidents";
import insuranceProposals from "../../api/insuranceProposals";
import Table from "../../components/Table";
import Reimbursements from "./ReimbursementsTable";

import { message, Spin } from "antd";

const Incidents = () => {
  const [risks, setRisks] = useState(null);

  useEffect(() => {
    insuranceProposals.getRisks().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setRisks(formattedData);
    });
  }, []);

  return (
    <div>
      {risks ? (
        <Table
          title="Відшкодування по інцидентах"
          refreshable
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
          options={{
            paging: false,
            search: false,
            sorting: false,
            rowStyle: (rowData) => ({
              color: rowData.reimbursements.length > 0 ? "#AAA" : "#000",
            }),
          }}
          detailPanel={(rowData) => (
            <Reimbursements
              incidentId={rowData.id}
              reimbursements={rowData.reimbursements}
            />
          )}
          data={(query) => {
            return new Promise((resolve, reject) => {
              incidents
                .getIncidents()
                .then((data) => {
                  console.log(data);
                  resolve({
                    data: data.data.filter(
                      (item) => item.incidentReviews?.[0].statusid === 1
                    ),
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

export default Incidents;
