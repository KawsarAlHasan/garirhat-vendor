import { Button, Image, Space, Table, Tag, Input } from "antd";
import CarImage from "../../assets/WhatsApp Image 2025-02-13 at 3.58.45 PM.jpeg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useMyVehicles } from "../../api/api";

const MyCarList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { myVehicles, isLoading, isError, error, refetch } = useMyVehicles();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={image} width={70} className="rounded-md" />
      ),
    },
    {
      title: "Model",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      ...getColumnSearchProps("year"),
    },
    {
      title: "Post ID",
      dataIndex: "post_id",
      key: "post_id",
      ...getColumnSearchProps("post_id"),
    },
    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color =
              tag === "Active"
                ? "green"
                : tag === "Deactive"
                ? "blue"
                : "volcano";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to="/my-car-list/1">
            <Button type="primary">View Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "BMW X5",
      year: 2020,
      condition: "Used",
      tags: ["Active"],
      image: CarImage,
      post_id: "G4GR43",
    },
    {
      key: "2",
      name: "Audi Q7",
      year: 2022,
      condition: "New",
      tags: ["Deactive"],
      image: CarImage,
      post_id: "G4SR43",
    },
    {
      key: "3",
      name: "Toyota Corolla",
      year: 2019,
      condition: "Certified",
      tags: ["Active"],
      image: CarImage,
      post_id: "T4GR43",
    },
  ];

  console.log("myVehicles", myVehicles);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MyCarList;
