import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Input, Form, Button, message, Upload } from "antd";
import { useState, useEffect } from "react";
import { API } from "../../api/api";

const UpdateProfile = ({ vendorProfile, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vendorProfile) {
      setFormData(vendorProfile);
    }
  }, [vendorProfile]);

  // Open Modal & Set Form Data
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Profile Image Upload
  const handleThumbnailImage = ({ fileList }) => {
    setProfileImage([...fileList]);

    if (fileList.length > 0) {
      onThumbnailImageChange(fileList[0].originFileObj);
    } else {
      onThumbnailImageChange(null);
    }
  };

  // Function to handle image change
  const onThumbnailImageChange = (imageFile) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: imageFile ? URL.createObjectURL(imageFile) : "",
    }));
  };

  // Save Profile
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const response = await API.put("/vendor/update", formData);
      if (response.status == 201) {
        message.success("Vendor Profile Update Successfully");
      }

      refetch();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button icon={<EditOutlined />} size="small" onClick={handleEditProfile}>
        Edit Profile
      </Button>

      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSaveProfile}
        okText="Save"
        cancelText="Cancel"
        loading={loading}
      >
        <Form layout="vertical">
          {/* Upload Profile Picture */}
          <Upload
            listType="picture-card"
            className="avatar-uploader mt-4"
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            multiple={false}
            fileList={profileImage}
            onChange={handleThumbnailImage}
            maxCount={1}
          >
            {profileImage.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Emergency Phone">
            <Input
              name="emergency_phone"
              value={formData.emergency_phone || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input
              name="company_name"
              value={formData.company_name || ""}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Business License">
            <Input
              name="business_lisence"
              value={formData.business_lisence || ""}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
