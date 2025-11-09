import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MenuItems = [
  {
    key: "0",
    icon: <UserOutlined />,
    label: <Link to="/Dashboard">Dashboard</Link>,
    name: "/",
  },
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="/Dashboard/HospitalList">Hospital</Link>,
    name: "/HospitalList",
  },
  {
    key: "2",
    icon: <HomeOutlined />,
    label: <Link to="/Dashboard/DepartmentList">Department</Link>,
    name: "/DepartmentList",
  },
  {
    key: "3",
    icon: <HomeOutlined />,
    label: <Link to="/Dashboard/EventList">Event</Link>,
    name: "/EventList",
  },
  {
    key: "4",
    icon: <HomeOutlined />,
    label: <Link to="/Dashboard/DoctorList">Doctor</Link>,
    name: "/DoctorList",
  },
  {
    key: "5",
    icon: <HomeOutlined />,
    label: <Link to="/Dashboard/AppointmentSlot">Appointment Slot</Link>,
    name: "/AppointmentSlot",
  },
];
