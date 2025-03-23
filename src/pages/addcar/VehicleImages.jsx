import { Upload, message, Switch } from "antd";
import { FacebookFilled, PlusOutlined } from "@ant-design/icons";
import instagramLogo from "../../assets/instagram-logo.png";
import facebookLogo from "../../assets/facebook-logo.png";
import { useState } from "react";

function VehicleImages({
  onThumbnailImageChange,
  onImagesChange,
  onFacebookPost,
}) {
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

  const onFacebook = (checked) => {
    onFacebookPost(checked);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
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
        </div>
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

      <div className=" p-4 bg-gray-100 rounded-lg shadow w-full">
        <div className="flex gap-3 mt-3 mb-2">
          <img
            className="w-[30px] h-[30px]"
            src={facebookLogo}
            alt="instagram logo"
          />
          <img
            className="w-[30px] h-[30px]"
            src={instagramLogo}
            alt="instagram logo"
          />
          <p className="font-semibold text-xl">
            Share your vehicles automatic to{" "}
            <a
              href="https://www.facebook.com/profile.php?id=61574473859060"
              target="_blank"
              className="text-ButtonColor"
            >
              GarirHat
            </a>
          </p>
        </div>
        <p>
          List your vehicles effortlessly on GarirHat and reach more buyers
          automatically! Boost your sales by automatically listing your vehicles
          on GarirHat-reach more buyers with zero hassle!
        </p>
        <div className="my-5">
          <Switch
            checkedChildren="On"
            unCheckedChildren="Off"
            size="large"
            onChange={onFacebook}
          />
        </div>

        <div className="mt-[50px]">
          <a
            href="http://localhost:5173/privacy"
            target="_blank"
            className="text-ButtonColor text-xl "
          >
            We recommend to always keep it on.
          </a>
        </div>
      </div>
    </div>
  );
}

export default VehicleImages;
