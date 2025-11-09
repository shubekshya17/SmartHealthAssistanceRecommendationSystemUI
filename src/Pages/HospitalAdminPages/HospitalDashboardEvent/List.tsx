import { Avatar, Button, Card, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { ListEventDto } from "../../../ViewModels/Event";
import dayjs from "dayjs";
import Create from "./Create";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const HospitalDashboardEvent = () => {
  const params = useParams();
  const [eventList, setEventList] = useState<ListEventDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getEventList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Event/GetEventListByHospitalId/${params.id}`);
      if (response.status === 200) {
        setEventList(response.data.data);
      } else {
        message.error(response.data?.message || "Failed to fetch Event List.");
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/Event/Delete/${id}`);
      if (response.status === 200 && response.data?.success) {
        message.success("Event Deleted Successfully");
        getEventList();
      } else {
        message.error(response.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const columns: ColumnsType<ListEventDto> = [
    {
      title: "EVENT",
      dataIndex: "eventName",
      key: "eventName",
      render: (_: any, record: ListEventDto) => (
        <Space>
          <Avatar src={record.imageUrl} size={40} style={{ borderRadius: 8 }} />
          <div>
            <div style={{ fontWeight: 600, color: "#344767" }}>
              {record.eventName}
            </div>
            <div style={{ fontSize: 12, color: "#7b809a" }}>
              {record.hospitalName}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "EVENT LOCATION",
      dataIndex: "eventLocation",
      key: "eventLocation",
      render: (_: any, record: ListEventDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {record.eventLocation}
          </div>
        </div>
      ),
    },
    {
      title: "EVENT DATE",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (_: any, record: ListEventDto) => (
        <div>
          <div style={{ fontWeight: 600, color: "#344767" }}>
            {dayjs(record.eventDate).format("YYYY-MM-DD")}
          </div>
        </div>
      ),
    },

    {
      title: "ACTION",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_: any, record: ListEventDto) => (
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
            onConfirm={() => handleDelete(record.eventId)}
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
            Event Table
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
          dataSource={eventList}
          pagination={false}
          style={{ padding: "0" }}
        />
      </Card>
      <Create
        open={open}
        onClose={closeDrawer}
        selectedRecord={selectedRecord}
        listData={getEventList}
      />
    </div>
  );
};
export default HospitalDashboardEvent;
