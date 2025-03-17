import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

function VehicleImages({ onThumbnailImageChange, onImagesChange }) {
  // Thumbnail Image State
  const [thumbnailFile, setThumbnailFile] = useState([]);

  const handleThumbnailImage = ({ fileList }) => {
    setThumbnailFile([...fileList]); // Ensure it's an array
    if (fileList.length > 0) {
      onThumbnailImageChange(fileList[0].originFileObj);
    } else {
      onThumbnailImageChange(null);
    }
  };

  // Multiple Image Upload State
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    setFileList([...fileList]); // Update state properly
    const files = fileList.map((file) => file.originFileObj);
    onImagesChange(files);
  };

  return (
    <div>
      {/* Thumbnail Image */}
      <span className="text-xl font-semibold">Thumbnail Image</span>
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
        fileList={thumbnailFile}
        onChange={handleThumbnailImage}
      >
        {thumbnailFile.length < 1 && ( // Show button only if no file is uploaded
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      <span className="text-xl font-semibold">Update Image</span>

      {/* Multiple Images Upload */}
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
        multiple={true} // Allow multiple images
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length < 5 && ( // Limit to 5 images
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </div>
  );
}

export default VehicleImages;
