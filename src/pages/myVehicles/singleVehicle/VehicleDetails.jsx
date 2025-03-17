import React from "react";
import { Table, Tag } from "antd";
import {
  FaCar,
  FaGasPump,
  FaCogs,
  FaKey,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useSingleVehicle } from "../../../api/vehicleApi";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
  const { vehicleID } = useParams();
  const { singleVehicle, isLoading, isError, error, refetch } =
    useSingleVehicle(vehicleID);
  const vehicleInfo = [
    { label: "Brand", value: "Mercedes Benz" },
    { label: "Model", value: "E220" },
    { label: "First registration", value: "04/2017" },
    { label: "KM", value: "160,000" },
    { label: "Hp", value: "190" },
    { label: "Engine", value: "Unknown" },
    { label: "Transmission", value: "Automatic" },
    { label: "Fuel", value: "Diesel" },
    { label: "Import vehicle", value: "No" },
    { label: "Engine damage", value: "Yes" },
    { label: "Gearbox damage", value: "No" },
    { label: "Accident free", value: "Yes" },
    { label: "Roadworthy", value: "No" },
    { label: "MOT until", value: "April 2023" },
  ];

  const extras = [
    "8 times wheels",
    "all wheel drive",
    "alloy wheels",
    "parking assistance",
    "electric windows",
    "Electric side mirrors",
    "air conditioning",
  ];

  const commissionData = [
    { price: "up to €250", commission: "€60" },
    { price: "€251 to €600", commission: "€100" },
    { price: "€601 to €2,100", commission: "€150" },
    { price: "€2,101 to €5,000", commission: "€260" },
    { price: "€5,001 to €8,000", commission: "€310" },
  ];

  console.log("singleVehicle", singleVehicle);

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-bold">Vehicle Details</h2>
        <ul className="mt-4 space-y-2 text-gray-700">
          {vehicleInfo.map((item, index) => (
            <li key={index} className="flex justify-between border-b pb-1">
              <span>{item.label}:</span> <span>{item.value}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-6">Extras</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {extras.map((extra, index) => (
            <Tag key={index} color="green">
              {extra}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">Purchase Commission Table</h2>
        <Table
          className="mt-4"
          dataSource={commissionData}
          pagination={false}
          columns={[
            { title: "Purchase Price", dataIndex: "price", key: "price" },
            { title: "Commission", dataIndex: "commission", key: "commission" },
          ]}
        />
      </div>
    </div>
  );
};

export default VehicleDetails;
