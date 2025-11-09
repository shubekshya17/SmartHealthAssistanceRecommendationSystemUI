import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { HospitalDropdownDto } from "../../../ViewModels/HospitalDropdownDto";
import type { CreateDoctorDto, ListDoctorDto } from "../../../ViewModels/Doctor";
import type { DepartmentListDto } from "../../../ViewModels/Department";

const DoctorCreate = (props: {
  open: boolean;
  onClose: () => void;
  selectedRecord: ListDoctorDto;
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

  const [departmentList, setDepartmentList] = useState<DepartmentListDto[]>([]);
  useEffect(() => {
    const fetchDepartment = async () => {
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
    fetchDepartment();
  }, []);

  useEffect(() => {
    if (props.selectedRecord) {
      form.setFieldsValue(props.selectedRecord);
    } else {
      form.resetFields();
    }
  }, [props.selectedRecord, form]);

  const onFinish = async (values: CreateDoctorDto) => {
    const payload = {
      ...values,
      experienceYear: Number(values.experienceYear),
      doctorId: props.selectedRecord ? props.selectedRecord.doctorId : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const response = props.selectedRecord
        ? await axios.put(`${BASE_URL}/Doctor/Update`, payload)
        : await axios.post(`${BASE_URL}/Doctor/PostDoctor`, payload);
      if (response.status === 200) {
        form.resetFields();
        props.listData();
        message.success("Doctor saved successfully!");
        props.onClose();
      } else {
        message.error(response.data?.message || "Failed to save doctor.");
      }
    } catch (error) {
      message.error("An error occurred while saving.");
      console.error(error);
    }
  };

  return (
    <Drawer
      title={props.selectedRecord ? "Edit Doctor" : "Create Doctor"}
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
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Full name is required!" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[
                { required: true, message: "Specialization is required!" },
              ]}
            >
              <Input placeholder="Enter specialization" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Qualification"
              name="qualification"
              rules={[
                {
                  required: true,
                  message: "Please enter qualification",
                },
              ]}
            >
              <Input placeholder="Enter qualification" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Experience Year"
              name="experienceYear"
              rules={[
                {
                  required: true,
                  message: "Please enter experience year",
                },
              ]}
            >
              <Input placeholder="Enter experience year" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Profile Image Path"
              name="profileImagePath"
              rules={[
                { required: true, message: "Profile Image Path is required!" },
              ]}
            >
              <Input placeholder="/images/doctor/img1.jpg" />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <Input placeholder="Enter description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter phone no",
                },
              ]}
            >
              <Input placeholder="Enter Phone no." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Department"
              name="departmentId"
              rules={[
                {
                  required: true,
                  message: "Please select department",
                },
              ]}
            >
              <Select
                placeholder="Select Department"
                style={{ width: "100%" }}
                options={
                  departmentList.map((item: any) => ({
                    value: item.departmentId,
                    label: item.departmentName,
                  })) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hospital"
              name="hospitals"
              rules={[
                {
                  required: true,
                  message: "Please select at least one hospital",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Add Hospitals"
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

export default DoctorCreate;
