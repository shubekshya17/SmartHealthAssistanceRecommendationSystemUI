import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import type { DepartmentListDto } from "../../../ViewModels/Department";
import DepartmentCreate from "./DepartmentCreate";

const BASE_URL = import.meta.env.VITE_API_URL;

const DepartmentList = () => {
  const [departmentList, setDepartmentList] = useState<DepartmentListDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getDepartmentList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Department/GetAll`);
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

  const columns: TableProps<DepartmentListDto>["columns"] = [
    {
      title: "Department",
      dataIndex: "departmentName",
      key: "departmentName",
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
            onConfirm={() => handleDelete(record.departmentId)}
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
        title="Department List"
        extra={
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add Department
          </Button>
        }
      >
        <Table
          size="small"
          columns={columns}
          pagination={false}
          dataSource={departmentList}
        />
      </Card>
      <DepartmentCreate
        open={open}
        onClose={closeDrawer}
        selectedRecord={selectedRecord}
        listData={getDepartmentList}
      />
    </>
  );
};
export default DepartmentList;
