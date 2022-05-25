import React from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Risks from "./Risks";
import Offices from "./Offices";
import ObjectTypes from "./ObjectTypes";
import DocumentTypes from "./DocTypes";
import FieldNames from "./FieldNames";
import ObjectPropNames from "./ObjectPropNames";
import Countries from "./Countries";

export default function Admin() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Ризики" value="1" />
          <Tab label="Типи об'єктів страхування" value="2" />
          <Tab label="Властивості об'єктів" value="5" />
          <Tab label="Типи документів" value="3" />
          <Tab label="Назви полів документів" value="4" />
          <Tab label="Адреси" value="6" />
          <Tab label="Офіси" value="7" />
        </TabList>
        <TabPanel value="1">
          <Risks />
        </TabPanel>
        <TabPanel value="2">
          <ObjectTypes />
        </TabPanel>
        <TabPanel value="3"><DocumentTypes /></TabPanel>
        <TabPanel value="4"><FieldNames /></TabPanel>
        <TabPanel value="5"><ObjectPropNames /></TabPanel>
        <TabPanel value="6"><Countries /></TabPanel>
        <TabPanel value="7"><Offices /></TabPanel>
      </TabContext>
    </div>
  );
}
