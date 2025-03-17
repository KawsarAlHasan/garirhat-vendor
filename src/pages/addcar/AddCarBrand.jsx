import { Input, Modal, message } from "antd";
import { useState } from "react";
import { API } from "../../api/api";

const AddCarBrand = ({ isModalOpen, setIsAddBrandModel, refetch}) => {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (!brandName.trim()) {
      message.error("Brand name cannot be empty!");
      return;
    }
    const addBrand = {
        brand_name: brandName,
        status: "pending",
        image: "On The Way",
    }
    setLoading(true);
    try {
        setLoading(true);
        const response = await API.post("/Brand/create", addBrand);
        if (response.status == 200) {
          message.success("Brand add Successfully");
        }
        refetch()
        setLoading(false);
        setIsAddBrandModel(false);
      } catch (error) {
        console.error(error);
        message.error("Something went wrong");
        setLoading(false);
      }
  };

  const handleCancel = () => {
    setIsAddBrandModel(false);
    setBrandName("");
  };

  return (
    <Modal
      title="Add Custom Brand"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Enter Brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
    </Modal>
  );
};

export default AddCarBrand;
