import { CloseOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";

const Notification = () => (
  <div style={{ padding: 24 }}>
    <Card
      title={
        <span style={{ fontSize: 18, fontWeight: 600, color: "#344767" }}>
          Alerts
        </span>
      }
      style={{
        borderRadius: 16,
        boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={16}>
        <div
          style={{
            background: "linear-gradient(195deg, #EC407A, #D81B60)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple primary alert with <strong>an example link</strong>. Give
            it a click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            background: "linear-gradient(195deg, #66615B, #403D39)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple secondary alert with <strong>an example link</strong>. Give
            it a click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            background: "linear-gradient(195deg, #66BB6A, #43A047)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple success alert with <strong>an example link</strong>. Give
            it a click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            background: "linear-gradient(195deg, #EF5350, #E53935)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple error alert with <strong>an example link</strong>. Give it
            a click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            background: "linear-gradient(195deg, #FB8C00, #F57C00)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple warning alert with <strong>an example link</strong>. Give
            it a click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
            padding: "16px 20px",
            borderRadius: 8,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            A simple info alert with <strong>an example link</strong>. Give it a
            click if you like.
          </span>
          <CloseOutlined style={{ cursor: "pointer" }} />
        </div>
      </Space>
    </Card>
  </div>
);
export default Notification;
