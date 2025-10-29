import React from "react";
import { Layout, Menu, theme } from "antd";
import { Heart } from "lucide-react";
import { MenuItems } from "./DashboardMenuItems";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 63,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* Header first, full width */}
      <Header
        style={{
          background: colorBgContainer,
          paddingInline: 0,
          padding: 0,
          margin: 0,
        }}
        className="w-full bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Heart className="text-blue-600 w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">
              SmartHealth
            </span>
          </div>
        </div>
      </Header>

      {/* Main layout with sider + content */}
      <Layout hasSider>
        <Sider style={siderStyle}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={MenuItems}
          />
        </Sider>

        <Layout>
          <Content style={{ margin: "16px 16px 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: 8,
              }}
            >
            <Outlet/>
            </div>
          </Content>

        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
