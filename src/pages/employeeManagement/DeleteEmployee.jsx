import React from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Button } from "antd";
const { confirm } = Modal;

function DeleteEmployee({ vendorId, refetch }) {
  const handleDelete = async () => {
    try {
      console.log("vendor id", vendorId);
    } catch (error) {
      message.error(`Error Deleting message: ${error.message}`);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this employee?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This employee will be moved to trash and permanently deleted after 30 days if not restored.",
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
        size="small"
        danger
        color="danger"
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteEmployee;
