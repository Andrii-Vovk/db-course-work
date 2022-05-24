import React, { useState, useEffect } from "react";

import documents from "../../api/documents";
import Table from "../../components/Table";

import { message, Spin } from "antd";

const DocumentsDetailsTable = ({ fields, docName, documentId }) => {
  const [fieldNames, setFieldNames] = useState(null);

  const [data, setData] = useState(fields);

  useEffect(() => {
    documents.getFieldNames().then((data) => {
      console.log(data);
      const formattedData = Object.fromEntries(
        data.data.map((item) => [item.id, item.name])
      );
      console.log(formattedData);
      setFieldNames(formattedData);
    });
  }, []);

  return (
    <div>
      {fieldNames ? (
        <Table
          title={`Поля документа ${docName}`}
          columns={[
            { title: "Назва", field: "fieldNameId", lookup: fieldNames },
            { title: "Значення", field: "fieldValue" },
          ]}
          editable={{
            onRowDelete: (oldData) => {
              setData(data.filter((row) => row.id !== oldData.id));
              return documents.deleteField(oldData.id);
            },
            onRowUpdate: (newData, oldData) => {
              let localData = { ...newData };
              delete localData["tableData"];
              return documents
                .putField(localData.id, localData)
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
              formattedData.documentId = documentId;
              setData([...data, formattedData]);
              return documents.addField(formattedData);
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

export default DocumentsDetailsTable;
