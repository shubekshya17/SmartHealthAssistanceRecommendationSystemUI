import { TableOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const HospitalDashboardMenuItems = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: <Link to="/HospitalDashboard/Profile">Profile</Link>,
  },
  {
    key: "departments",
    icon: <TableOutlined />,
    label: <Link to="/HospitalDashboard/Department">Department</Link>,
  },
  {
    key: "events",
    icon: <TableOutlined />,
    label: <Link to="/HospitalDashboard/Event">Event</Link>,
  },
  {
    key: "doctors",
    icon: <TableOutlined />,
    label: <Link to="/HospitalDashboard/Doctor">Doctor</Link>,
  },
  {
    key: "appointment",
    icon: <TableOutlined />,
    label: <Link to="/HospitalDashboard/Appointment">Appointment</Link>,
  },
  {
    key: "appointmentSlot",
    icon: <TableOutlined />,
    label: <Link to="/HospitalDashboard/AppointmentSlot">Appointment Slot</Link>,
  },
];
