import { Button, Card, message, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ListHospitalDto } from "../../ViewModels/HospitalDto";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const HospitalList = () => {
  const navigate = useNavigate();
  const [hospitalList, setHospitalList] = useState<ListHospitalDto[]>([]);

  const getHospitalList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Hospitals/GetAll`);
      if (response.status === 200 && response?.data) {
        setHospitalList(response.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Hospital List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getHospitalList();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Hospitals/Delete/${id}`);
      if (response.status === 200 && response.data?.success) {
        message.success("Hospital Data Deleted Successfully");
        getHospitalList();
      } else {
        message.error(response.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: TableProps<ListHospitalDto>["columns"] = [
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
      key: "hospitalName",
      render: (_, record) => (
        <a
          onClick={() => navigate(`/HospitalDetails/${record.hospitalId}`)}
          style={{ color: "#1677ff", cursor: "pointer" }}
        >
          {record.hospitalName}
        </a>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Specialities",
      key: "specialities",
      dataIndex: "specialities",
      render: (_, { specialities }) => (
        <>
          {specialities.map((specialities) => {
            let color = specialities.length > 5 ? "green" : "geekblue";
            return (
              <Tag color={color} key={specialities}>
                {specialities.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />}></Button>

          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.hospitalId)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              // onClick={() => {
              //   deleteAction(record.hospitalId);
              // }}
            ></Button>
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
        title="Hospital List"
        extra={
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/CreateHospital")}
            style={{
              borderColor: "#91caff",
              color: "#1677ff",
              backgroundColor: "#e6f4ff",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Add Hospital
          </Button>
        }
      >
        <Table
          size="small"
          columns={columns}
          pagination={false}
          dataSource={hospitalList}
        />
      </Card>
    </>
  );
};
export default HospitalList;
