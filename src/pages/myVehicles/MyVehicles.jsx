import React, { useState } from "react";
import { useMyVehicles } from "../../api/api";
import { Table, Button, Spin, Input, Avatar } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteVehicle from "./DeleteVehicle";
const { Search } = Input;

function MyVehicles() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    vehicle_code: "",
  });

  const { myVehicles, pagination, isLoading, isError, error, refetch } =
    useMyVehicles(filters);

  const handleTableChange = (pagination) => {
    const { current: page, pageSize: limit } = pagination;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit,
    }));
  };

  React.useEffect(() => {
    refetch(); // Refetch data whenever filters are updated
  }, [filters, refetch]);

  if (isLoading) return <Spin size="large" className="block mx-auto my-10" />;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  const columns = [
    {
      title: "Serial",
      dataIndex: "id",
      key: "id",
      width: 8,
      render: (text, record, index) =>
        index + 1 + (filters.page - 1) * filters.limit,
    },
    {
      title: "Vehicle Code",
      dataIndex: "vehicle_code",
      key: "vehicle_code",
      width: "10%",
    },
    {
      title: "Make & Model",
      dataIndex: "make",
      key: "make",
      render: (_, render) => (
        <div className="flex gap-2">
          <div className="flex justify-center items-center">
            {render.thumbnail_image !== "" ? (
              <Avatar
                size={45}
                src={<img src={render.thumbnail_image} alt="avatar" />}
              />
            ) : (
              <Avatar size={45}>Image</Avatar>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-xl">{render.make}</h2>
            <h2 className="text-gray-500">{render.model}</h2>
          </div>
        </div>
      ),
    },
    {
      title: "Year",
      dataIndex: "year_of_manufacture",
      key: "year_of_manufacture",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Preview",
      key: "details",
      width: 80,
      render: (_, record) => (
        <Link to={`/my-vehicles/${record.id}`}>
          <Button type="primary" size="small" icon={<EyeOutlined />}>
            Preview
          </Button>
        </Link>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      width: 80,
      render: (_, record) => (
        <Link to={`/my-vehicles/${record.id}/edit`}>
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
        <DeleteVehicle vehicleID={record.id} refetch={refetch} size={"small"} />
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold my-4">My Vehicles</h2>
      <div className="flex justify-between mb-4">
        <Search
          placeholder="Search Vehicle Code..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={(value) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              vehicle_code: value || "",
              page: 1, // Reset to the first page
            }));
          }}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={myVehicles.map((item, index) => ({
          key: index,
          ...item,
        }))}
        pagination={{
          current: filters.page,
          pageSize: filters.limit,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        bordered
      />
    </div>
  );
}

export default MyVehicles;
