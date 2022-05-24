import React, { useState, useEffect } from "react";

import documents from "../../api/documents";
import policies from "../../api/policies";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const PolicyDocumentsTable = ({ docs, policyId }) => {
  const [documentNames, setDocumentnames] = useState(null);
  const [docNumbers, setDocNumbers] = useState(null);

  const [data, setData] = useState(docs ?? []);

  useEffect(() => {
    documents.getDocuments().then((data) => {
      console.log(data);
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.documentTitle])
      );
      const docNumbers = Object.fromEntries(
        data.data.map((item) => [item.id, item.documentNumber])
      );
      console.log(formattedData);
      setDocumentnames(formattedData);
      setDocNumbers(docNumbers);
    });
  }, []);

  return (
    <div>
      {documentNames ? (
        <Table
          title={`Документи`}
          columns={[
            { title: "Назва", field: "documentId", lookup: documentNames },
            {
              title: "Назва",
              field: "documentId",
              lookup: docNumbers,
              editable: "never",
            },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return policies.deleteDocuments(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return policies
                .putDocuments(localData.id, localData)
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
              console.log(formattedData);
              console.log(policyId);
              setData([...data, formattedData]);
              return policies.postDocuments(formattedData);
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

export default PolicyDocumentsTable;
