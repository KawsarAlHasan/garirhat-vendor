import React, { useState } from "react";
import { Button, Upload, Modal, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API } from "../../api/api";

function NidCardVerify({ vendorProfile, refetch }) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nIDFrontFile, setNIDFrontFile] = useState([]);
  const [nIDBackFile, setNIDBackFile] = useState([]);

  const handleNIDFrontImage = ({ fileList }) => {
    setNIDFrontFile([...fileList]);
  };

  const handleNIDBackImage = ({ fileList }) => {
    setNIDBackFile([...fileList]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    setSubmitLoading(true);
    const formData = new FormData();

    if (nIDFrontFile.length > 0) {
      formData.append("nid_card_front", nIDFrontFile[0].originFileObj);
    }

    if (nIDBackFile.length > 0) {
      formData.append("nid_card_back", nIDBackFile[0].originFileObj);
    }

    try {
      const response = await API.put("/vendor/nid", formData);
      if (response.status == 200) {
        message.success("NID upload successfully");
        refetch();
        setSubmitLoading(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Identification & Documents</h3>
          {vendorProfile.verify_status == "Unverified" && (
            <Button type="primary" onClick={showModal}>
              Upload NID Card
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <p>
              <strong>NID Card (Front):</strong>
            </p>
            <Image
              width={180}
              src={vendorProfile.nid_card_front}
              alt="NID Front"
              className="rounded-lg"
            />
          </div>
          <div>
            <p>
              <strong>NID Card (Back):</strong>
            </p>
            <Image
              width={180}
              src={vendorProfile.nid_card_back}
              alt="NID Back"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <Modal
        title="Upload NID Card"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div className="flex gap-4 mt-10">
          <div>
            <h2>NID Front Image</h2>
            <Upload
              listType="picture-card"
              className="avatar-uploader mt-4"
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                }
                return isImage;
              }}
              multiple={false} // Single file only
              fileList={nIDFrontFile}
              onChange={handleNIDFrontImage}
            >
              {nIDFrontFile.length < 1 && ( // Show button only if no file is uploaded
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>
          <div>
            <h2>NID Back Image</h2>
            <Upload
              listType="picture-card"
              className="avatar-uploader mt-4"
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                }
                return isImage;
              }}
              multiple={false} // Single file only
              fileList={nIDBackFile}
              onChange={handleNIDBackImage}
            >
              {nIDBackFile.length < 1 && ( // Show button only if no file is uploaded
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <Button
          loading={submitLoading}
          className="mt-4 w-full"
          type="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
}

export default NidCardVerify;
