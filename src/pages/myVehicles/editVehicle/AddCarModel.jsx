import { Input, Modal, message } from "antd";
import { useState } from "react";
import { API } from "../../api/api";

const AddCarModel = ({ isModalOpen, setIsModalOpen, brandID, refetch }) => {
  const [modelName, setModelName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (!modelName.trim()) {
      message.error("Model name cannot be empty!");
      return;
    }

    const addModel = {
      model_name: modelName,
      status: "pending",
      image: "On The Way",
      brand_id: brandID,
    };

    console.log(addModel);

    setLoading(true);
    try {
      setLoading(true);
      const response = await API.post("/model/create", addModel);
      if (response.status == 200) {
        message.success("Model add Successfully");
      }
      refetch();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModelName("");
  };

  return (
    <Modal
      title="Add Custom Model"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Enter model name"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
      />
    </Modal>
  );
};

export default AddCarModel;
