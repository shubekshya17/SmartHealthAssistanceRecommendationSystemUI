import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import type { DepartmentListDto } from "../../../ViewModels/Department";
import axios from "axios";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Create from "./Create";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const Department = () => {
  const params = useParams();
  const [departmentList, setDepartmentList] = useState<DepartmentListDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getDepartmentList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Department/GetDepartmentByHospitalId/${params.id}`);
      if (response.status === 200) {
        setDepartmentList(response.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Department List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/Department/Delete/${id}`
      );
      if (response.status === 200 && response.data?.success) {
        message.success("Department Deleted Successfully");
        getDepartmentList();
      } else {
        message.error(response.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<DepartmentListDto> = [
    {
      title: "DEPARTMENT NAME",
      dataIndex: "departmentName",
      key: "departmentName",
      render: (_: any, record: DepartmentListDto) => (
        <Space>
          <div>
            <div style={{ fontWeight: 600, color: "#344767" }}>
              {record.departmentName}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_: any, record: DepartmentListDto) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedRecord(record);
              setOpen(true);
            }}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.departmentId)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button type="link" icon={<DeleteOutlined />} />
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
        {/* Header Section with Button */}
        <div
          style={{
            background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
            padding: "24px 24px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "white" }}
          >
            Department Table
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
          pagination={false}
          dataSource={departmentList}
          style={{ padding: "0" }}
          rowKey="departmentId"
        />
      </Card>

      {/* Drawer Component (placeholder for now) */}
      {/* You can add your drawer here */}
      <Create
        open={open}
        onClose={closeDrawer}
        selectedRecord={selectedRecord}
        listData={getDepartmentList}
      />
    </div>
  );
};

export default Department;
