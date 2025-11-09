import { Card, message, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import type { AppointmentDto } from "../../../ViewModels/Appointment";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_URL;
const Appointment = () => {
  const params = useParams();
  const [appointmentList, setAppointmentList] = useState<AppointmentDto[]>([]);

  const getAppointmentList = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Appointment/GetAppointmentsById/${params.id}`
      );
      if (response.status === 200) {
        setAppointmentList(response.data.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Appointment List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getAppointmentList();
  }, []);

  const columns: ColumnsType<AppointmentDto> = [
    {
      title: "PATIENT",
      dataIndex: "patientName",
      key: "patientName",
      render: (_: any, record: AppointmentDto) => (
        <Space>
          <div>
            <div style={{ fontWeight: 600, color: "#344767" }}>
              {record.patientName}
            </div>
            <div style={{ fontSize: 12, color: "#7b809a" }}>
              {record.patientEmail}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "PHONE NO",
      dataIndex: "patientPhone",
      key: "patientPhone",
      render: (_: any, record: AppointmentDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.patientPhone}
          </div>
        </div>
      ),
    },
    {
      title: "APPOINTMENT DATE",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: AppointmentDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {dayjs(record.date).format("YYYY-MM-DD")}
          </div>
        </div>
      ),
    },
    {
      title: "DOCTOR",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (_: any, record: AppointmentDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.doctorName}
          </div>
        </div>
      ),
    },
    {
      title: "START TIME",
      dataIndex: "startTime",
      key: "startTime",
      render: (_: any, record: AppointmentDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.startTime}
          </div>
        </div>
      ),
    },
    {
      title: "END TIME",
      dataIndex: "endTime",
      key: "endTime",
      render: (_: any, record: AppointmentDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.endTime}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
            padding: "24px 24px",
            color: "white",
          }}
        >
          <h3
            style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "white" }}
          >
            Doctor Table
          </h3>
        </div>
        <Table
          columns={columns}
          dataSource={appointmentList}
          pagination={false}
          style={{ padding: "0" }}
        />
      </Card>
    </div>
  );
};
export default Appointment;
