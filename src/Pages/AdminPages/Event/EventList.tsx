import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import EventCreate from "./EventCreate";
import type { ListEventDto } from "../../../ViewModels/Event";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_URL;

const EventList = () => {
  const [eventList, setEventList] = useState<ListEventDto[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const closeDrawer = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  const getEventList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Event/GetAll`);
      if (response.status === 200) {
        setEventList(response.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Event List."
        );
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
      const response = await axios.delete(
        `${BASE_URL}/Event/Delete/${id}`
      );
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

  const columns: TableProps<ListEventDto>["columns"] = [
    {
      title: "Event",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Organised By",
      dataIndex: "hospitalName",
      key: "hospitalName",
    },
    {
      title: "Event Location",
      dataIndex: "eventLocation",
      key: "eventLocation",
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
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
    <>
      <Card
        type="inner"
        size="small"
        title="Event List"
        extra={
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Add Event
          </Button>
        }
      >
        <Table
          size="small"
          columns={columns}
          pagination={false}
          dataSource={eventList}
        />
      </Card>
      <EventCreate
        open={open}
        onClose={closeDrawer}
        selectedRecord={selectedRecord}
        listData={getEventList}
      />
    </>
  );
};
export default EventList;
