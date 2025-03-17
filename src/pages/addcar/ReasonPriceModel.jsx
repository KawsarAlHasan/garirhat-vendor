import { Input, Modal, message } from "antd";
import { useState } from "react";
import { API } from "../../api/api";

const ReasonPriceModel = ({ isModalOpen, setReasonPriceField, refetch}) => {
  const [reasonName, setReasonName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (!reasonName.trim()) {
      message.error("Reason name cannot be empty!");
      return;
    }
    const addReason = {
        name: reasonName,
        status: "Active",
    }
    setLoading(true);
    try {
        setLoading(true);
        const response = await API.post("/price-reason/create", addReason);
        if (response.status == 200) {
          message.success("Postal Code add Successfully");
        }
        console.log(response, "resposne");
        setLoading(false);
        setReasonPriceField(false);
        refetch();
      } catch (error) {
        console.error(error);
        message.error("Something went wrong");
        setLoading(false);
      }
  };

  const handleCancel = () => {
    setReasonPriceField(false);
    setReasonName("");
  };

  return (
    <Modal
      title="Add Reason Price Name"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Enter Reason Price Name"
        value={reasonName}
        onChange={(e) => setReasonName(e.target.value)}
      />
    </Modal>
  );
};

export default ReasonPriceModel;
