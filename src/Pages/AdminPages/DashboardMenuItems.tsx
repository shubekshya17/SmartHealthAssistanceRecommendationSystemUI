import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MenuItems = [
  {
    key: "0",
    icon: <UserOutlined />,
    label: <Link to="/Dashboard">Page 1</Link>,
    name: '/'
  },
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    label: <Link to="/Dashboard/DashboardPage1">Page 2</Link>,
    name: "/DashboardPage1"
  },
];
