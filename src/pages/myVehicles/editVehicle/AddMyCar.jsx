import {
  Input,
  Select,
  Button,
  Form,
  Collapse,
  message,
  DatePicker,
} from "antd";
import { CarOutlined } from "@ant-design/icons";
import {
  API,
  useAllBrand,
  useAlLocation,
  useModelByBrand,
} from "../../api/api";
import { useEffect, useState } from "react";
import AddCarModel from "./AddCarModel";
import AddCarBrand from "./AddCarBrand";
import TextArea from "antd/es/input/TextArea";
import AddVehicleFeature from "./AddVehicleFeature";
import VehiclePricing from "./VehiclePricing";
import VehicleImages from "./VehicleImages";

const { Option } = Select;

const AddMyCar = () => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [brandID, setBrandID] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBrandModel, setIsAddBrandModel] = useState(false);

  const [color, setColor] = useState([]);
  const [brandName, setBrandName] = useState();
  const [selectedModelName, setSelectedModelName] = useState();
  const [divitionName, setDivitionName] = useState();
  const [distictName, setDistictName] = useState();
  const [upazilaName, setUpazilaName] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [prices, setPrices] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [images, setImages] = useState([]);

  const [form] = Form.useForm();
  const { alLocation } = useAlLocation(); //all divition with distict with Upozila

  const { allBrand, refetch: brandRefetch } = useAllBrand(); // Car All Brand
  const {
    modelByBrand,
    isLoading,
    refetch: modelRefetch,
  } = useModelByBrand(brandID);

  //  add custom model open
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch("/colorlist.json")
      .then((response) => response.json())
      .then((data) => setColor(data.colors))
      .catch((error) => console.error("Error fetching Color:", error));
  }, []);

  // Handle Division Change
  const handleDivisionChange = (value, option) => {
    setSelectedDivision(value);
    setDivitionName(option.label);
    setSelectedDistrict(null); // Reset district on division change
    setFilteredUpazilas([]); // Reset Upazilas
    const selectedDiv = alLocation.find((div) => div.id === value);
    setFilteredDistricts(selectedDiv ? selectedDiv.districts : []);
  };

  // Handle District Change
  const handleDistrictChange = (value, option) => {
    setSelectedDistrict(value);
    setDistictName(option.label);
    const selectedDist = filteredDistricts.find((dist) => dist.id === value);
    setFilteredUpazilas(selectedDist ? selectedDist.upazilas : []);
  };

  const handleUpazila = (value, option) => {
    setUpazilaName(option.label);
  };

  const handleFeatureSelect = (features) => {
    setSelectedFeatures(features);
  };

  const handlePrices = (pricing) => {
    setPrices(pricing);
  };

  const handleThumbnailImage = (file) => {
    setThumbnailImage(file);
  };

  const handleImages = (files) => {
    setImages(files);
  };

  // input all data
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("make", brandName);
    formData.append("model", selectedModelName);
    formData.append("division", divitionName);
    formData.append("district", distictName);
    formData.append("upzila", upazilaName);

    if (thumbnailImage) {
      formData.append("thumbnail_image", thumbnailImage);
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("prices", JSON.stringify(prices));
    formData.append("features", JSON.stringify(selectedFeatures));

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      setLoading(true);
      const response = await API.post("/vehicle/create", formData);
      if (response.status == 201) {
        message.success("Car added Successfully");
      }

      console.log("response", response);
      // refetch();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleSelectBrand = (value, option) => {
    setBrandID(value);
    setBrandName(option.label);
    form.setFieldsValue({ make: value });
  };
  const handleSelectModel = (value, option) => {
    setSelectedModelName(option.label);
    form.setFieldsValue({ model: value });
  };

  return (
    <div className="mx-auto bg-white p-6">
      <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2 font-MyStyle">
        <CarOutlined />
        Sell your car from home for the best price
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid lg:grid-cols-2 gap-x-4">
          {/* car make  */}
          <Form.Item
            rules={[{ required: true, message: "Please Select make" }]}
          >
            <div className="flex items-center justify-between">
              <h1>Make</h1>
              <button
                onClick={() => setIsAddBrandModel(true)}
                className="p-0.5 m-0.5 font-semibold rounded text-TextColor"
              >
                + Custom Add Brand
              </button>
            </div>
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select Car Make"
              loading={isLoading}
              optionFilterProp="label"
              options={allBrand.map((brand) => ({
                value: brand.id,
                label: brand.brand_name,
              }))}
              onChange={handleSelectBrand}
            />
          </Form.Item>
          {/* car model  */}
          <Form.Item
            rules={[{ required: true, message: "Please Select Model" }]}
          >
            <div className="flex justify-between items-center">
              <h1>Model</h1>
              <button
                disabled={!brandID}
                onClick={showModal}
                className={`p-0.5 m-0.5 font-semibold rounded ${
                  !brandID
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-TextColor"
                }`}
              >
                + Custom Add Model
              </button>
            </div>
            <Select
              showSearch
              className="h-[44px] w-full"
              placeholder="Select Car Model"
              optionFilterProp="label"
              loading={isLoading}
              options={modelByBrand?.data?.model?.map((model) => ({
                value: model.id,
                label: model.model_name,
              }))}
              disabled={!brandID}
              onChange={handleSelectModel}
            />
          </Form.Item>
          {/* car year  */}
          <Form.Item label="Year" name="year_of_manufacture">
            <DatePicker
              className="h-[44px] w-full"
              placeholder="Select Enter Year"
              picker="year"
            />
          </Form.Item>
          {/* Trim  */}
          <Form.Item label="Trim" name="trim">
            <Input placeholder="Enter Trim" className="py-[10px]" />
          </Form.Item>
          {/* VIN  */}
          <Form.Item
            label="VIN (Vehicle Identification/Chassis Number)"
            name="vin_number"
          >
            <Input placeholder="Enter VIN" className="py-[10px]" />
          </Form.Item>
          {/* Engine  */}
          <Form.Item label="Engine" name="engine_capacity_cc">
            <Input placeholder="Enter Engine" className="py-[10px]" />
          </Form.Item>
          {/* mileage  */}
          <Form.Item label="Mileage" name="mileage">
            <Input
              type="number"
              suffix="miles"
              placeholder="Enter Mileage"
              className="py-[10px]"
            />
          </Form.Item>
          {/* Power  */}
          <Form.Item label="Power" name="power">
            <Input
              type="number"
              placeholder="Enter Power"
              className="py-[10px]"
            />
          </Form.Item>
          {/* drivetrain  */}
          <Form.Item label="Drivetrain" name="drive_type">
            <Select placeholder="Select Drivetrain" className="h-[44px]">
              <Option value="AWD">AWD</Option>
              <Option value="FWD">FWD</Option>
              <Option value="RWD">RWD</Option>
            </Select>
          </Form.Item>
          {/* Exterior Color */}
          <Form.Item label="Exterior Color" name="color">
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select Exterior Color"
              rules={[
                { required: true, message: "Please select Exterior Color" },
              ]}
              optionFilterProp="title"
              options={color.map((location) => ({
                value: location.name,
                title: location.name,
                label: (
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded border border-gray-300"
                      style={{ backgroundColor: location.hex }}
                    ></span>
                    <h4>{location.name}</h4>
                  </div>
                ),
              }))}
            />
          </Form.Item>
          {/* Interior color  */}
          <Form.Item label="Interior color" name="interior_color">
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select Interior color"
              rules={[
                { required: true, message: "Please select Interior color" },
              ]}
              optionFilterProp="title"
              options={color.map((location) => ({
                value: location.name,
                title: location.name,
                label: (
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded border border-gray-300"
                      style={{ backgroundColor: location.hex }}
                    ></span>
                    <h4>{location.name}</h4>
                  </div>
                ),
              }))}
            />
          </Form.Item>
          {/* MPG  */}
          <Form.Item label="MPG" name="fuel_efficiency_kmpl">
            <Input placeholder="Enter MPG" className="py-[10px]" />
          </Form.Item>
          {/* Registation Year  */}
          <Form.Item label="Registation Year" name="registration_year">
            <Input placeholder="Enter Registation Year" className="py-[10px]" />
          </Form.Item>
          {/* RTO   */}
          <Form.Item label="RTO" name="rtn">
            <Input placeholder="Enter RTO" className="py-[10px]" />
          </Form.Item>
          {/* fuelType */}
          <Form.Item label="Fuel/Vehicle Type" name="fuel_type">
            <Select placeholder="Select Fuel Type" className="h-[44px]">
              <Option value="Petrol">Petrol</Option>
              <Option value="Diesel">Diesel</Option>
              <Option value="Hybrid">Hybrid</Option>
              <Option value="CNG">CNG</Option>
              <Option value="Electric">Electric</Option>
              <Option value="LPG">LPG</Option>
              <Option value="Petrol CNG">Petrol-CNG</Option>
              <Option value="Petrol LPG">Petrol-LPG</Option>
            </Select>
          </Form.Item>
          {/* body Type */}
          <Form.Item label="Body Type" name="body_Type">
            <Select placeholder="Select Body Type" className="h-[44px]">
              <Option value="Hantchback">Hantchback</Option>
              <Option value="SUV">SUV</Option>
              <Option value="Sedan">Sedan</Option>
              <Option value="MUV">MUV</Option>
              <Option value="Minivan">Minivan</Option>
              <Option value="Pickup">Pickup</Option>
            </Select>
          </Form.Item>
          {/* Condition  */}
          <Form.Item label="Condition" name="vehicle_condition">
            <Select placeholder="Select Condition" className="h-[44px]">
              <Option value="New">New</Option>
              <Option value="Used">Used</Option>
              <Option value="Pre-own">Pre-Own</Option>
              <Option value="Recondition">Recondition</Option>
              <Option value="Sell By Owner">Sell By Owner</Option>
              <Option value="Upcoming Car">Upcoming Car</Option>
            </Select>
          </Form.Item>
          {/* Loan Condition  */}
          <Form.Item label="Loan" name="loan_condition">
            <Select placeholder="Select Loan Condition" className="h-[44px]">
              <Option value="Available">Available</Option>
              <Option value="notAvailable">Not Available</Option>
            </Select>
          </Form.Item>
          {/* transmission  */}
          <Form.Item label="Transmission" name="transmission">
            <Select placeholder="Select Transmission" className="h-[44px]">
              <Option value="Automatic">Automatic</Option>
              <Option value="Manual">Manual</Option>
            </Select>
          </Form.Item>
          {/* Select Division */}
          <Form.Item label="Division">
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select a division"
              optionFilterProp="label"
              options={alLocation.map((location) => ({
                value: location.id,
                label: location.name,
              }))}
              onChange={handleDivisionChange}
            />
          </Form.Item>
          {/* Select District */}
          <Form.Item label="District">
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select a District"
              optionFilterProp="label"
              options={filteredDistricts.map((district) => ({
                value: district.id,
                label: district.name,
              }))}
              disabled={!selectedDivision}
              onChange={handleDistrictChange}
            />
          </Form.Item>
          {/* Select Upazila */}
          <Form.Item label="Upazila">
            <Select
              showSearch
              className="h-[44px]"
              placeholder="Select an Upazila"
              optionFilterProp="label"
              options={filteredUpazilas.map((upazila) => ({
                value: upazila.id,
                label: upazila.name,
              }))}
              disabled={!selectedDistrict}
              onChange={handleUpazila}
            />
          </Form.Item>
        </div>

        {/* feature  */}
        <AddVehicleFeature onFeatureSelect={handleFeatureSelect} />

        {/* measurements  */}
        <Collapse
          className="my-5"
          items={[
            {
              key: "2",
              label: "Measurements",
              children: (
                <Form.Item name="measurements">
                  <div className="grid grid-cols-2 gap-x-4">
                    {/* Doors  */}
                    <Form.Item label="Doors" name="doors">
                      <Select placeholder="Select Doors" className="h-[44px]">
                        <Option value="4 Doors">4 Doors</Option>
                        <Option value="5 Doors">5 Doors</Option>
                        <Option value="6 Doors">6 Doors</Option>
                        <Option value="7 Doors">7 Doors</Option>
                      </Select>
                    </Form.Item>
                    {/* Sites  */}
                    <Form.Item label="Car Seat" name="seating_capacity">
                      <Input
                        type="number"
                        className="py-[10px]"
                        placeholder="Enter Car Seat"
                      />
                    </Form.Item>
                    {/* Cabin size  */}
                    <Form.Item label="Cabin Size" name="cabin_size">
                      <Input
                        type="number"
                        className="py-[10px]"
                        placeholder="Enter Cabin Size"
                      />
                    </Form.Item>
                    {/* Cabin size  */}
                    <Form.Item label="Trunk Size" name="trunk_size">
                      <Input
                        type="number"
                        className="py-[10px]"
                        placeholder="Enter Trunk Size"
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
              ),
            },
          ]}
        />

        {/* Price Calculate  */}
        <VehiclePricing onPrices={handlePrices} />

        {/* Selling price  */}
        {/* <Form.Item label="Selling Price" name="selling-price" className="mt-3">
          <Input placeholder="Enter Selling Price" className="py-[10px]" />
        </Form.Item> */}

        {/* Discount price price  */}
        <Form.Item
          label="Discount Price"
          name="discount_price"
          className="mt-3"
        >
          <Input placeholder="Enter Discount Price" className="py-[10px]" />
        </Form.Item>

        {/* Type Description  */}
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea rows={4} placeholder="Please type Short Description....." />
        </Form.Item>

        <VehicleImages
          onThumbnailImageChange={handleThumbnailImage}
          onImagesChange={handleImages}
        />

        <Form.Item>
          <Button
            disabled={loading}
            loading={loading}
            htmlType="submit"
            className="w-full mt-5 bg-ButtonColor hover:!bg-ButtonHover hover:!text-white font-semibold text-white py-5"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* added modal components  */}
      <AddCarModel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        brandID={brandID}
        refetch={modelRefetch}
      />
      <AddCarBrand
        isModalOpen={isAddBrandModel}
        setIsAddBrandModel={setIsAddBrandModel}
        refetch={brandRefetch}
      />
    </div>
  );
};

export default AddMyCar;
