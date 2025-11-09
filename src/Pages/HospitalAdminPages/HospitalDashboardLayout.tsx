import React, { useState } from "react";
import { Layout, Menu, Badge, Space } from "antd";
import {
  DashboardOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { HospitalDashboardMenuItems } from "./HospitalDashboardMenuItems";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const HospitalDashboardLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("tables");
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        style={{
          background: "linear-gradient(195deg, #42424a, #191919)",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px 32px",
            color: "white",
          }}
        >
          <DashboardOutlined style={{ fontSize: 28 }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            Hospital Dashboard
          </span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          onClick={({ key }) => setCurrentPage(key)}
          items={HospitalDashboardMenuItems}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
          }}
          theme="dark"
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Space>
            <HomeOutlined style={{ color: "#7b809a" }} />
            <span style={{ color: "#7b809a" }}>/</span>
            <span style={{ color: "#344767", textTransform: "capitalize" }}>
              {currentPage}
            </span>
          </Space>

          <Space size={16}>
            <UserOutlined
              style={{ fontSize: 18, color: "#7b809a", cursor: "pointer" }}
            />
            <Badge dot>
              <BellOutlined
                style={{ fontSize: 18, color: "#7b809a", cursor: "pointer" }}
                onClick={() => navigate("/HospitalDashboard/Notification")}
              />
            </Badge>
          </Space>
        </Header>

        <Content style={{ background: "#f8f9fa" }}>
          <Outlet />
        </Content>
      </Layout>

      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
      >
        <SettingOutlined style={{ fontSize: 20, color: "#344767" }} />
      </div>
    </Layout>
  );
};

export default HospitalDashboardLayout;
