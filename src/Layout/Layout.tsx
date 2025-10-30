import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
//import Navbar from "../Components/Navbar";
import ChatBot from '../Components/Chatbot';

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
      <Content>
          <Outlet />
      </Content>
      <ChatBot />

    </Layout>
  );
};

export default WebsiteLayout;
