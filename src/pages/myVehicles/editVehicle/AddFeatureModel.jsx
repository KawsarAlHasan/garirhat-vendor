import { Input, Modal, message } from "antd";
import { useState } from "react";
import { API } from "../../api/api";

const AddFeatureModel = ({ isModalOpen, setIsFetureAddModel, refetch }) => {
  const [featureName, setFeatureName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (!featureName.trim()) {
      message.error("Feature name cannot be empty!");
      return;
    }

    const addFeature = {
        feature_name: featureName,
        status: "pending",
        category_id: 1,
    }

    setLoading(true);
    try {
        setLoading(true);
        const response = await API.post("/feature/create", addFeature);
        if (response.status == 200) {
          message.success("Feature add Successfully");
        }
        refetch();
        setLoading(false);
        setIsFetureAddModel(false)
      } catch (error) {
        console.error(error);
        message.error("Something went wrong");
        setLoading(false);
      }
  };

  const handleCancel = () => {
    setIsFetureAddModel(false);
    setFeatureName("");
  };

  return (
    <Modal
      title="Add Custom Feature"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Enter Feature name"
        value={featureName}
        onChange={(e) => setFeatureName(e.target.value)}
      />
    </Modal>
  );
};

export default AddFeatureModel;
