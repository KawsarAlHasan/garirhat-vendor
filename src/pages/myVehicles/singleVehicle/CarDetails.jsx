import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import CarOverview from "./CarOverview";
import Features from "./Features";
import Specifications from "./Specifications";
import Loading from "../../../components/Loading";
import { useSingleVehicle } from "../../../api/vehicleApi";
import { Link, useParams } from "react-router-dom";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Image, Modal, Button, message, Select, Badge } from "antd";
import { API } from "../../../api/api";
import DeleteVehicle from "../DeleteVehicle";

const CarDetails = () => {
  const { vehicleID } = useParams();
  const { singleVehicle, isLoading, isError, error, refetch } =
    useSingleVehicle(vehicleID);

  const vehicle = singleVehicle.data;
  const [status, setStatus] = useState(vehicle?.status);

  useEffect(() => {
    if (vehicle) {
      setStatus(vehicle.status);
    }
  }, [vehicle]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleStatusChange = async (value) => {
    try {
      const response = await API.put(`/vehicle/status/${vehicleID}`, {
        status: value,
      });

      if (response.statusText == "OK") {
        setStatus(value); // Update status locally
        message.success("Vehicle status updated successfully");
        refetch(); // Refresh Vehicle details after update
      } else {
        message.error("Failed to update Vehicle status");
      }
    } catch (error) {
      message.error(`Error updating status ${error.message}`);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        {error.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className=" p-4 grid md:grid-cols-2 gap-6">
        {/* Image Carousel */}
        <Carousel responsive={responsive} className="h-[370px]">
          {vehicle.images.map((img, index) => (
            <Image
              width="100%"
              height="370px"
              className="rounded-lg"
              key={index}
              src={img}
              alt="vehicle_images"
            />
          ))}
        </Carousel>

        {/* Car Details */}
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">
              {vehicle.year_of_manufacture} {vehicle.make} {vehicle.model}
            </h1>
            <Link to={`/my-vehicles/${vehicleID}/edit`}>
              <Button type="primary" size="small" icon={<EditOutlined />}>
                Edit
              </Button>
            </Link>
          </div>

          <p className="text-green-600 text-2xl font-semibold">
            ৳{vehicle.price}
          </p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Vehicle Code:</strong> {vehicle.vehicle_code}
            </p>
            <p>
              <strong>Location:</strong> {vehicle.city && `${vehicle.city},`}
              {vehicle.district}, {vehicle.division}
            </p>
            <p>
              <strong>Discount Price:</strong> ৳{vehicle.discount_price}
            </p>
            <p>
              <strong>Advertised On: </strong>
              {new Date(vehicle.created_at).toLocaleString()}
            </p>

            <div className="grid grid-cols-2 mt-1">
              <Badge count={5}>
                <Button>Message for this Vehicle</Button>
              </Badge>
              <Badge count={3}>
                <Button icon={<ExclamationCircleOutlined />}>
                  Report for this Vehicle
                </Button>
              </Badge>
            </div>

            <div>
              <strong>Status: </strong>
              {vehicle.status === "Active" || vehicle.status === "Upcoming" ? (
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  style={{ width: 120 }}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Upcoming", label: "Upcoming" },
                    { value: "Sold Out", label: "Sold Out" },
                  ]}
                />
              ) : (
                <Select
                  value={vehicle.status}
                  style={{ width: 120 }}
                  disabled
                />
              )}
            </div>

            <div className="flex gap-1">
              <strong className="mt-2">Delete This Vehicle: </strong>
              <DeleteVehicle vehicleID={vehicleID} isNavigete={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <CarOverview vehicle={vehicle} />
        <Features features={vehicle?.features} />
        <Specifications vehicle={vehicle} />
      </div>
    </div>
  );
};

export default CarDetails;
