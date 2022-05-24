import React, { useState } from "react";

import { Layout as AntdLayout, Menu } from "antd";
import { Link } from "react-router-dom";

import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HouseIcon from '@mui/icons-material/House';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const { Header, Content, Sider } = AntdLayout;

const Layout = ({ children }) => {
  const items = [
    {
      label: <Link to="/">Clients</Link>,
      key: "Clients",
      icon: <AssignmentIndIcon />
    },
    {
      label: <Link to="/documents">Documents</Link>,
      key: "Documents",
      icon: <ArticleIcon />
    },
    {
      label: <Link to="/proposals">Proposals</Link>,
      key: "Proposals",
      icon: <PostAddIcon />
    },
    {
      label: <Link to="/objects">Objects</Link>,
      key: "Objects",
      icon: <HouseIcon />
    },
    {
      label: <Link to="/policies">Policies</Link>,
      key: "policies",
      icon: <DocumentScannerIcon />
    },
    {
      label: <Link to="/incidents">Incidents</Link>,
      key: "incidents",
      icon: <AccessibleForwardIcon />
    },
    {
      label: <Link to="/employees">Employees</Link>,
      key: "employees",
      icon: <PersonSearchIcon />
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
