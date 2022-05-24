import React, { useState } from "react";

import { Layout as AntdLayout, Menu } from "antd";
import { Link } from "react-router-dom";

import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

const { Header, Content, Sider } = AntdLayout;

const Layout = ({ children }) => {
  const items = [
    {
      label: <Link to="/">Clients</Link>,
      key: "Clients",
      icon: <AccessibleForwardIcon />
    },
    {
      label: <Link to="/documents">Documents</Link>,
      key: "Documents",
      icon: <AccessibleForwardIcon />
    },
    {
      label: <Link to="/proposals">Proposals</Link>,
      key: "Proposals",
      icon: <AccessibleForwardIcon />
    },
    {
      label: <Link to="/objects">Objects</Link>,
      key: "Objects",
      icon: <AccessibleForwardIcon />
    },
  ];

  const [collapsed, setCollapsed] = useState(true);

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Header>Insurance</Header>
      <AntdLayout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          width={200}
          className="site-layout-background"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <Menu mode="inline" items={items} />
        </Sider>
        <AntdLayout>
          <Content>{children}</Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
