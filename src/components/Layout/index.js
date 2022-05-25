import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Layout as AntdLayout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { logOut } from "../../store/authSlice";

import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ArticleIcon from "@mui/icons-material/Article";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HouseIcon from "@mui/icons-material/House";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import SecurityIcon from "@mui/icons-material/Security";

import styles from "./styles.module.scss";

const { Header, Content, Sider } = AntdLayout;

const Layout = ({ children }) => {
  const position = useSelector((state) => state.auth.user.position);
  const token = useSelector((state) => state.auth.jwtToken);
  const isManager = () => ["manager", "admin"].includes(position.toLowerCase());
  const isAccountant = () =>
    ["accountant", "admin"].includes(position.toLowerCase());

  const items = token
    ? [
        isManager() && {
          label: <Link to="/">Clients</Link>,
          key: "Clients",
          icon: <AssignmentIndIcon />,
        },
        isManager() && {
          label: <Link to="/documents">Documents</Link>,
          key: "Documents",
          icon: <ArticleIcon />,
        },
        isManager() && {
          label: <Link to="/proposals">Proposals</Link>,
          key: "Proposals",
          icon: <PostAddIcon />,
        },
        isManager() && {
          label: <Link to="/objects">Objects</Link>,
          key: "Objects",
          icon: <HouseIcon />,
        },
        {
          label: <Link to="/policies">Policies</Link>,
          key: "policies",
          icon: <DocumentScannerIcon />,
        },
        isAccountant() && {
          label: <Link to="/incidents">Incidents</Link>,
          key: "incidents",
          icon: <AccessibleForwardIcon />,
        },
        {
          label: <Link to="/employees">Employees</Link>,
          key: "employees",
          icon: <PersonSearchIcon />,
        },
      ]
    : [];

  const [collapsed, setCollapsed] = useState(true);

  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Header>
        <div className={styles.header}>
          <span className={styles.flex}>
            <SecurityIcon />
            Insurance
          </span>

          {currentUser.jwtToken && (
            <div className={styles.auth}>
              {console.log("currentUser", currentUser)}
              <span>
                {currentUser.user.firstName} {currentUser.user.lastName}
              </span>
              <Button type="primary" onClick={() => dispatch(logOut())}>
                Вийти
              </Button>
            </div>
          )}
        </div>
      </Header>
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
