import React, { useEffect, useState } from "react";
import { Form, Input, Button, Steps, message, Select, TimePicker } from "antd";
import type { CreateHospitalDto } from "../../../ViewModels/HospitalDto";
import axios from "axios";
import dayjs from "dayjs";
import type { DepartmentListDto } from "../../../ViewModels/Department";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const BASE_URL = import.meta.env.VITE_API_URL;

const CreateHospital: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const { Step } = Steps;
  const navigate = useNavigate();

  const stepFields = [
    ["hospitalName", "address", "phone", "email", "type"],
    ["latitude", "longitude", "openingTime", "closingTime"],
    ["description", "specialities", "departments", "imagePath"],
  ];

  const next = async () => {
    try {
      await form.validateFields(stepFields[current]);
      setCurrent(current + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const prev = () => setCurrent(current - 1);

  const onFinish = async (values: CreateHospitalDto) => {
    console.log("values", values);
    const payload = {
      ...values,
      hospitalId: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      openingTime: dayjs(values.openingTime).format("HH:mm:ss"),
      closingTime: dayjs(values.closingTime).format("HH:mm:ss"),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/Hospitals/PostHospital`,
        payload
      );
      if (response.status === 200 && response.data?.success) {
        form.resetFields();
        message.success("Hospital data submitted successfully!");
        navigate("/Dashboard/HospitalList");
      } else {
        message.error(response.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
        Create Hospital
      </h2>
      <Steps current={current} className="mb-6">
        <Step title="Basic Info" />
        <Step title="Location & Timing" />
        <Step title="Description & Specialities" />
      </Steps>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* STEP 1 */}
        <div style={{ display: current === 0 ? "block" : "none" }}>
          <>
            <Form.Item
              label="Hospital Name"
              name="hospitalName"
              rules={[
                { required: true, message: "Please enter hospital name" },
              ]}
            >
              <Input placeholder="Enter hospital name" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="+977-0000000000" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please select hospital type" },
              ]}
            >
              <Select
                placeholder="Select hospital type"
                options={[
                  { value: 1, label: "Hospital" },
                  { value: 2, label: "Clinic" },
                  { value: 3, label: "HealthPost" },
                ]}
              />
            </Form.Item>
          </>
        </div>

        {/* STEP 2 */}
        <div style={{ display: current === 1 ? "block" : "none" }}>
          <>
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[{ required: true, message: "Please enter latitude" }]}
            >
              <Input type="number" placeholder="27.6673" />
            </Form.Item>

            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true, message: "Please enter longitude" }]}
            >
              <Input type="number" placeholder="85.3239" />
            </Form.Item>

            <Form.Item
              label="Opening Time"
              name="openingTime"
              rules={[
                { required: true, message: "Please select opening time" },
              ]}
            >
              <TimePicker format="HH:mm:ss" />
            </Form.Item>

            <Form.Item
              label="Closing Time"
              name="closingTime"
              rules={[
                { required: true, message: "Please select closing time" },
              ]}
            >
              <TimePicker format="HH:mm:ss" />
            </Form.Item>
          </>
        </div>

        {/* STEP 3 */}
        <div style={{ display: current === 2 ? "block" : "none" }}>
          <>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter hospital description",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter hospital description" />
            </Form.Item>

            <Form.Item
              label="Specialities"
              name="specialities"
              rules={[
                {
                  required: true,
                  message: "Please enter at least one speciality",
                },
              ]}
            >
              <Select mode="tags" placeholder="Add specialities" />
            </Form.Item>

            <Form.Item
              label="Departments"
              name="departments"
              rules={[
                {
                  required: true,
                  message: "Please select at least one department",
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Add Departments"
                options={
                  departmentList.map((item: any) => ({
                    value: item.departmentId,
                    label: item.departmentName,
                  })) ?? []
                }
              />
            </Form.Item>

            <Form.Item
              label="Image Path"
              name="imagePath"
              rules={[
                {
                  required: true,
                  message: "Please insert hospital image",
                },
              ]}
            >
              <Input placeholder="/images/hospitals/patan-hospital.jpg" />
            </Form.Item>
          </>
        </div>

        {/* Step navigation */}
        <div className="flex justify-between mt-6">
          {current > 0 && (
            <Button htmlType="button" onClick={prev}>
              Previous
            </Button>
          )}

          {current < 2 && (
            <Button type="primary" htmlType="button" onClick={next}>
              Next
            </Button>
          )}

          {current === 2 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default CreateHospital;
