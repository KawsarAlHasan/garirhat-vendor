import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API } from "../../api/api";

const { Option } = Select;

function AddNewEmployee() {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form] = Form.useForm();
  const [nIDFrontFile, setNIDFrontFile] = useState([]);

  const handleNIDFrontImage = ({ fileList }) => {
    setNIDFrontFile([...fileList]);
  };

  const onFinish = async (values) => {
    setSubmitLoading(true);
    const formData = new FormData();

    if (nIDFrontFile.length > 0) {
      formData.append("nid_or_birth_image", nIDFrontFile[0].originFileObj);
    }

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await API.post("/vendor-employees/create", formData);
      if (response.status == 200) {
        message.success("Employee Created successfully");
        //  refetch();
        setSubmitLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      message.error(`Error: ${error.message}`);
      setSubmitLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold text-xl">Add New Employee</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item name="date_of_birth" label="Date of Birth">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Select date of birth"
            />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="blood_type" label="Blood Type">
            <Select placeholder="Select blood type">
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
            </Select>
          </Form.Item>

          <Form.Item name="permanent_address" label="Permanent Address">
            <Input.TextArea rows={2} placeholder="Enter permanent address" />
          </Form.Item>

          <Form.Item name="current_address" label="Current Address">
            <Input.TextArea rows={2} placeholder="Enter current address" />
          </Form.Item>

          <Form.Item name="mobile_number" label="Mobile Number">
            <Input placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email is required!" }]}
          >
            <Input type="email" placeholder="Enter email address" />
          </Form.Item>

          <Form.Item name="designation" label="Designation">
            <Input placeholder="Enter designation" />
          </Form.Item>

          <Form.Item name="department" label="Department">
            <Input placeholder="Enter department name" />
          </Form.Item>

          <Form.Item name="salary" label="Salary">
            <Input type="number" placeholder="Enter salary amount" />
          </Form.Item>

          <Form.Item name="employee_position" label="Position">
            <Select placeholder="Select Employee Position">
              <Option value="Manager">Manager</Option>
              <Option value="Employee">Employee</Option>
            </Select>
          </Form.Item>

          <Form.Item name="job_type" label="Job Type">
            <Select placeholder="Select job type">
              <Option value="Full-Time">Full-Time</Option>
              <Option value="Part-Time">Part-Time</Option>
              <Option value="Contract">Contract</Option>
            </Select>
          </Form.Item>

          <Form.Item label="National ID / Birth Certificate">
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                }
                return isImage;
              }}
              multiple={false} // Single file only
              fileList={nIDFrontFile}
              onChange={handleNIDFrontImage}
            >
              {nIDFrontFile.length < 1 && ( // Show button only if no file is uploaded
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            loading={submitLoading}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Save Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddNewEmployee;

// busn_id
// name
// phone
// emergency_phone
// about
// company_name
// business_lisence
// profile_picture
// banner
// nid_card_front
// nid_card_back
// is_active
// status
// verify_status
