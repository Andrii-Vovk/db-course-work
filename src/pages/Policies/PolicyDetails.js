import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Card } from "antd";
import Masonry from "react-responsive-masonry";

import styles from "./styles.module.scss";
import PolicyDocumentsTable from "./PolicyDocumentsTable";
import PolicyPaymentsTable from "./PolicyPaymentsTable";
import IncidentsTable from "./IncidentsTable";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const PolicyDetails = ({
  client,
  employee,
  insuranceObject,
  insuranceProposal,
  bankCredentials,
  payments,
  incidents,
  docs,
  policyId,
}) => {
  const position = useSelector((state) => state.auth.user.position);
  const isAccountant = () => ["accountant", "admin"].includes(position.toLowerCase());

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Загальна інформація" value="1" />
          <Tab label="Документи" value="2" />
          <Tab
            label="Оплата страхівок"
            value="3"
            disabled={!isAccountant()}
          />
          <Tab label="Інциденти" value="4" />
        </TabList>
        <TabPanel value="1">
          <Masonry gutter="20px">
            <Card title="Клієнт" className={styles.shadow}>
              <div className={styles.flex}>
                <strong>Ім'я:</strong>
                <span>
                  {client.firstName} {client.lastName}
                </span>
              </div>
              <div className={styles.flex}>
                <strong>Email:</strong>
                <span>{client.email}</span>
              </div>
              <div className={styles.flex}>
                <strong>Номер телефону:</strong>
                <span>{client.phone}</span>
              </div>
            </Card>
            <Card title="Менеджер" className={styles.shadow}>
              <div className={styles.flex}>
                <strong>Ім'я:</strong>
                <span>
                  {employee.firstName} {employee.lastName}
                </span>
              </div>
              <div className={styles.flex}>
                <strong>Email:</strong>
                <span>{employee.email}</span>
              </div>
              <div className={styles.flex}>
                <strong>Номер телефону:</strong>
                <span>{employee.phoneNumber}</span>
              </div>
            </Card>
            <Card title="Що страхуємо" className={styles.shadow}>
              <div className={styles.flex}>
                <strong>Назва:</strong>
                <span>{insuranceObject.name}</span>
              </div>
              <div className={styles.flex}>
                <strong>Опис:</strong>
                <span>{insuranceObject.description}</span>
              </div>
              <div className={styles.flex}>
                <strong>Ціна:</strong>
                <span>{insuranceObject.price} грн.</span>
              </div>
              {insuranceObject.insuranceObjectProps.length > 0 && (
                <div>
                  <strong>Властивості:</strong>
                  <div>
                    <ul>
                      {insuranceObject.insuranceObjectProps.map((prop) => (
                        <li key={prop.id}>
                          <strong>{prop.property.name}: </strong>
                          <span>{prop.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
            <Card title="Як страхуємо" className={styles.shadow}>
              <div className={styles.flex}>
                <strong>Назва:</strong>
                <span>{insuranceProposal.name}</span>
              </div>
              <div className={styles.flex}>
                <strong>Опис:</strong>
                <span>{insuranceProposal.description}</span>
              </div>
              <div className={styles.flex}>
                <strong>Ціна:</strong>
                <span>{insuranceProposal.price} грн.</span>
              </div>
              <div className={styles.flex}>
                <strong>Тривалість:</strong>
                <span>{insuranceProposal.duration}</span>
              </div>
              <div className={styles.flex}>
                <strong>Потрібен огляд:</strong>
                <span>
                  {insuranceProposal.preInsuranceExaminationRequired
                    ? "Так"
                    : "Ні"}
                </span>
              </div>
              <div className={styles.flex}>
                <strong>Потрібен Документ:</strong>
                <span>
                  {insuranceProposal.ownershipDocumentRequired ? "Так" : "Ні"}
                </span>
              </div>
              {insuranceProposal.riskInsuranceProposals.length > 0 && (
                <div>
                  <strong>Ризики:</strong>
                  <div>
                    <ul>
                      {insuranceProposal.riskInsuranceProposals.map((risk) => (
                        <li key={risk.id}>
                          {risk.risk.name} - {risk.coverSum} грн., франшиза:{" "}
                          {risk.franchise} грн.
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
            <Card title="Банківські дані" className={styles.shadow}>
              <div className={styles.flex}>
                <strong>IBAN:</strong>
                <span>{bankCredentials.iban}</span>
              </div>
              <div className={styles.flex}>
                <strong>Номер картки:</strong>
                <span> {bankCredentials.cardNumber}</span>
              </div>
            </Card>
          </Masonry>
        </TabPanel>
        <TabPanel value="2">
          <PolicyDocumentsTable docs={docs} policyId={policyId} />
        </TabPanel>
        <TabPanel value="3">
          <PolicyPaymentsTable payments={payments} policyId={policyId} />
        </TabPanel>
        <TabPanel value="4">
          <IncidentsTable
            incidents={incidents}
            insuranceProposal={insuranceProposal}
            policyId={policyId}
          />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default PolicyDetails;
