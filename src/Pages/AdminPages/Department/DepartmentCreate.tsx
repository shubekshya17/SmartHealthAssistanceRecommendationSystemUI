import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import type { DepartmentListDto } from "../../../ViewModels/Department";
import axios from "axios";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const DepartmentCreate = (props: {
  open: boolean;
  onClose: () => void;
  selectedRecord: DepartmentListDto;
  listData: () => void;
}) => {
  const [form] = useForm();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (props.selectedRecord) {
      form.setFieldsValue(props.selectedRecord);
    } else {
      form.resetFields();
    }
  }, [props.selectedRecord, form]);

  const onFinish = async (values: DepartmentListDto) => {
    try {
      const result = props.selectedRecord
        ? { ...values, departmentId: props.selectedRecord.departmentId }
        : values;
      const response = props.selectedRecord
        ? await axios.put(`${BASE_URL}/Department/Update`, result)
        : await axios.post(`${BASE_URL}/Department/PostDepartment`, result);
      if (response.status === 200) {
        form.resetFields();
        props.listData();
        message.success("Department saved successfully!");
        props.onClose();
      } else {
        message.error(response.data?.message || "Failed to save Department.");
      }
    } catch (error) {
      message.error("An error occurred while saving.");
      console.error(error);
    }
  };

  return (
    <Drawer
      title={props.selectedRecord ? "Edit Department" : "Create Department"}
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Department Name"
              name="departmentName"
              rules={[
                { required: true, message: "Department Name is required!" },
              ]}
            >
              <Input placeholder="Enter Department Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DepartmentCreate;
