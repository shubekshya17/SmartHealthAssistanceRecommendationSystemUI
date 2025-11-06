import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import type { HospitalDropdownDto } from "../../../ViewModels/HospitalDropdownDto";
import type { CreateEventDto, ListEventDto } from "../../../ViewModels/Event";
import dayjs from "dayjs";

const EventCreate = (props: {
  open: boolean;
  onClose: () => void;
  selectedRecord: ListEventDto;
  listData: () => void;
}) => {
  const [form] = useForm();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [hospitalList, setHospitalList] = useState<HospitalDropdownDto[]>([]);
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Hospitals/GetHospitalDropdown`
        );
        if (response.status === 200) {
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
    fetchHospital();
  }, []);

  useEffect(() => {
    if (props.selectedRecord) {
      form.setFieldsValue(props.selectedRecord);
    } else {
      form.resetFields();
    }
  }, [props.selectedRecord, form]);

  const onFinish = async (values: CreateEventDto) => {
    const payload = {
      ...values,
      eventId: props.selectedRecord ? props.selectedRecord.eventId : 0,
      startingTime: dayjs(values.startingTime).format("HH:mm:ss"),
      closingTime: dayjs(values.closingTime).format("HH:mm:ss"),
    };
    try {
      const response = props.selectedRecord
        ? await axios.put(`${BASE_URL}/Event/Update`, payload)
        : await axios.post(`${BASE_URL}/Event/PostHospitalEvent`, payload);
      if (response.status === 200) {
        form.resetFields();
        props.listData();
        message.success("Event saved successfully!");
        props.onClose();
      } else {
        message.error(response.data?.message || "Failed to save event.");
      }
    } catch (error) {
      message.error("An error occurred while saving.");
      console.error(error);
    }
  };

  return (
    <Drawer
      title={props.selectedRecord ? "Edit Event" : "Create Event"}
      open={props.open}
      onClose={props.onClose}
      width={720}
      extra={
        <Space>
          <Button
            type="primary"
            form="basic"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form
        name="basic"
        autoComplete="off"
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Event Name"
              name="eventName"
              rules={[{ required: true, message: "Event Name is required!" }]}
            >
              <Input placeholder="Enter Event Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Event Location"
              name="eventLocation"
              rules={[
                { required: true, message: "Event Location is required!" },
              ]}
            >
              <Input placeholder="Enter Event Location" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter Event Description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Event Date"
              name="eventDate"
              rules={[{ required: true, message: "Event date is required!" }]}
            >
              <DatePicker
                placeholder="Enter Event Date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Event Banner"
              name="imageUrl"
              rules={[{ required: true, message: "Event Image is required!" }]}
            >
              <Input placeholder="/images/event-banner/img1.jpg" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Starting Time"
              name="startingTime"
              rules={[
                { required: true, message: "Please select starting time!" },
              ]}
            >
              <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Closing Time"
              name="closingTime"
              rules={[
                { required: true, message: "Please select closing time!" },
              ]}
            >
              <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Organized By"
              name="hospitalId"
              rules={[
                {
                  required: true,
                  message: "Please select organizer",
                },
              ]}
            >
              <Select
                placeholder="Select Organizer"
                style={{ width: "100%" }}
                options={
                  hospitalList.map((item: any) => ({
                    value: item.hospitalId,
                    label: item.hospitalName,
                  })) ?? []
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EventCreate;
