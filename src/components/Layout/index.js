import React from "react";

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

  return (
    <AntdLayout style={{minHeight:"100vh"}}>
      <Header>Insurance</Header>
      <AntdLayout style={{minHeight:"100vh"}}>
        <Sider width={200} className="site-layout-background">
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
