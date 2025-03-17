import React from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Button } from "antd";
import { API } from "../../api/api";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

function DeleteVehicle({ vehicleID, isNavigete, refetch, size }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await API.put(`/vehicle/status/${vehicleID}`, {
        status: "Delete",
      });

      if (response.statusText == "OK") {
        message.warning(
          "Vehicle moved to trash. You have 30 days to restore it."
        );
        if (isNavigete) {
          navigate("/my-vehicles");
        } else {
          refetch();
        }
      }
    } catch (error) {
      message.error(`Error Deleting message: ${error.message}`);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this vehicle?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This vehicle will be moved to trash and permanently deleted after 30 days if not restored.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete();
      },
      onCancel() {
        message.error("Delete canceled");
      },
    });
  };
  return (
    <div>
      <Button
        onClick={showDeleteConfirm}
        size={size}
        danger
        color="danger"
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteVehicle;
