import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const WebsiteLayout: React.FC = () => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
          <Outlet />
      </Content>
    </Layout>
  );
};

export default WebsiteLayout;
