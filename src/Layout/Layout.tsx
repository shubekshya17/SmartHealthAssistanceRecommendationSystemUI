import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const { Content } = Layout;

const WebsiteLayout: React.FC = () => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={WebsiteMenuItems.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
          style={{ flex: 1, minWidth: 0, padding: "0px 2px" }}
        />
      </Header> */}
      <Navbar/>
      <Content>
          <Outlet />
      </Content>
    </Layout>
  );
};

export default WebsiteLayout;
