import React, { useState } from "react";
import { Table, Button, Spin, Input, Avatar } from "antd";
import { Link, useParams } from "react-router-dom";
import { useVendorsEmployee } from "../../api/api";
const { Search } = Input;
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import DeleteEmployee from "./DeleteEmployee";

function EmployeeManagement() {
  const { vendorsEmployee, isLoading, isError, error, refetch } =
    useVendorsEmployee();

  if (isLoading) return <Spin size="large" className="block mx-auto my-10" />;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  //   {
  //     "id": 1,
  //     "busn_id": 1,
  //     "vendor_id": 3,
  //     "employee_position": "Owner",
  //     "name": "name",
  //     "date_of_birth": null,
  //     "gender": null,
  //     "permanent_address": null,
  //     "current_address": null,
  //     "mobile_number": null,
  //     "email": null,
  //     "blood_type": null,
  //     "nid_card_or_birth_certificate": null,
  //     "designation": null,
  //     "department": null,
  //     "salary": 10,
  //     "job_type": "Permanent"
  // }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "employee_position",
      key: "employee_position",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
    },
    {
      title: "More Details",
      key: "details",
      width: 80,
      render: (_, record) => (
        <Link to={`/employee-management/${record.vendor_id}`}>
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            More Details
          </Button>
        </Link>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      width: 80,
      render: (_, record) => (
        <Link to={`/employee-management/${record.vendor_id}/edit`}>
          <Button type="primary" size="small" icon={<EditOutlined />}>
            Edit
          </Button>
        </Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      width: 80,
      render: (_, record) => (
        <DeleteEmployee
          vendorId={record.vendor_id}
          refetch={refetch}
          size={"small"}
        />
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold my-4">All Employees</h2>
      <div className="flex justify-between mb-4">
        <div></div>

        <Link to="/employee-management/add-new-employee">
          <Button type="primary">Add New Vehicle</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={vendorsEmployee.data.map((item, index) => ({
          key: index,
          ...item,
        }))}
        bordered
      />
    </div>
  );
}

export default EmployeeManagement;
