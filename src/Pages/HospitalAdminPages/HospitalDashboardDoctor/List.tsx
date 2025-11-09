import { Avatar, Button, Card, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { ListDoctorDto } from "../../../ViewModels/Doctor";
import Create from "./Create";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;
const Doctor = () => {
  const params = useParams();
  const [doctorList, setDoctorList] = useState<ListDoctorDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getDoctorList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Doctor/GetDoctorByHospitalId/${params.id}`);
      if (response.status === 200) {
        setDoctorList(response.data);
      } else {
        message.error(response.data?.message || "Failed to fetch Doctor List.");
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Doctor/Delete/${id}`);
      if (response.status === 200 && response.data?.success) {
        message.success("Doctor Deleted Successfully");
        getDoctorList();
      } else {
        message.error(response.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<ListDoctorDto> = [
    {
      title: "DOCTOR",
      dataIndex: "fullName",
      key: "fullName",
      render: (_: any, record: ListDoctorDto) => (
        <Space>
          <Avatar
            src={record.profileImagePath}
            size={40}
            style={{ borderRadius: 8 }}
          />
          <div>
            <div style={{ fontWeight: 600, color: "#344767" }}>
              {record.fullName}
            </div>
            <div style={{ fontSize: 12, color: "#7b809a" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "DEPARTMENT NAME",
      dataIndex: "departmentName",
      key: "function",
      render: (_: any, record: ListDoctorDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.departmentName}
          </div>
          <div style={{ fontSize: 12, color: "#7b809a" }}>
            {record.experienceYear} yrs experience
          </div>
        </div>
      ),
    },
    {
      title: "CONTACT NO.",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => (
        <span style={{ color: "#7b809a" }}>{text}</span>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_: any, record: ListDoctorDto) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedRecord(record);
              setOpen(true);
            }}
            icon={<EditOutlined />}
          ></Button>

          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.doctorId)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button type="link" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
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

          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setOpen(true)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "#1A73E8",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={doctorList}
          pagination={false}
          style={{ padding: "0" }}
        />
        <Create
          open={open}
          onClose={closeDrawer}
          selectedRecord={selectedRecord}
          listData={getDoctorList}
        />
      </Card>
    </div>
  );
};
export default Doctor;
