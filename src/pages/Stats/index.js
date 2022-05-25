import React from "react";

import ProfitStat from "./ProfitStat";
import PolicyCount from "./PolicyCount";
import PoliciesSold from "./PoliciesSold";

import styles from "./styles.module.scss";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Card } from "antd";

const Stats = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.fullContainer}>
      <Card className={styles.fixedCard}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Прибуток" value="1" />
            <Tab label="Кількість Полісів" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
          <TabPanel value="1">
            <ProfitStat />
          </TabPanel>
          <TabPanel value="2">
            <PolicyCount />
          </TabPanel>
          <TabPanel value="3">
            <PoliciesSold />
          </TabPanel>
        </TabContext>
      </Card>
    </div>
  );
};

export default Stats;
