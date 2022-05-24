import React, { useState } from "react";

import { Layout as AntdLayout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = AntdLayout;

const Layout = ({ children }) => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "Home",
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
