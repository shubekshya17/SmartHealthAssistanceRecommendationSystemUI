import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import DoctorCreate from "./DoctorCreate";
import type { ListDoctorDto } from "../../../ViewModels/Doctor";

const BASE_URL = import.meta.env.VITE_API_URL;

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState<ListDoctorDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getDoctorList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Doctor/GetAll`);
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

  const columns: TableProps<ListDoctorDto>["columns"] = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Experience Year",
      dataIndex: "experienceYear",
      key: "experienceYear",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_, record) => (
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
    <>
      <Card
        type="inner"
        size="small"
        title="Doctor List"
        extra={
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add Doctor
          </Button>
        }
      >
        <Table
          size="small"
          columns={columns}
          pagination={false}
          dataSource={doctorList}
        />
      </Card>
      <DoctorCreate
        open={open}
        onClose={closeDrawer}
        selectedRecord={selectedRecord}
        listData={getDoctorList}
      />
    </>
  );
};
export default DoctorList;
