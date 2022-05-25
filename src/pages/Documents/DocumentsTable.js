import React, { useState, useEffect } from "react";

import documents from "../../api/documents";
import Table from "../../components/Table";

import DocumentsDetailsTable from "./DocumentDetailsTable";

import { Card, message, Spin } from "antd";

const DocumentsTable = () => {
  const [types, setTypes] = useState(null);

  useEffect(() => {
    documents.getDocumentTypes().then((data) => {
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      setTypes(formattedData);
    });
  }, []);

  return (
    <div>
      {types ? (
        <Table
          title="Документи"
          refreshable
          columns={[
            { title: "Назва", field: "documentTitle" },
            { title: "Номер", field: "documentNumber" },
            { title: "Тип", field: "documentType.id", lookup: types },
            {
              title: "Дата реєстрації",
              field: "registrationDate",
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
          detailPanel={(rowData) => (
            <Card>
              <DocumentsDetailsTable
                fields={rowData.documentFields}
                docName={rowData.documentTitle}
                documentId={rowData.id}
              />
            </Card>
          )}
          editable={{
            onRowDelete: (oldData) => {
              return documents.deleteDocuments(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return documents
                .putDocuments(localData.id, localData)
                .catch((err) => {
                  message.error(err.response.data.message || err.message);
                });
            },
            onRowAdd: (newData) => {
              newData.documentTypeId = newData.documentType.id;
              return documents.createDocuments(newData);
            },
          }}
          options={{
            paging: false,
            search: false,
            sorting: false,
          }}
          data={(query) => {
            return new Promise((resolve, reject) => {
              documents
                .getDocuments()
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

export default DocumentsTable;
