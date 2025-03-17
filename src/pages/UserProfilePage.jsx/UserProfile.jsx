import { Card, Button, Rate, Tag, Image } from "antd";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useVendorProfile } from "../../api/api";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
  const [error, setError] = useState(false);
  const { vendorProfile } = useVendorProfile();

  console.log("vendorProfile", vendorProfile);

  return (
    <div className="flex justify-center items-center font-MyStyle">
      <Card className="w-full max-w-6xl border-none">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start p-4">
          {/* Profile Picture */}
          <div className="flex items-center">
            {error || !vendorProfile.profile_picture ? (
              <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-gray-200">
                <UserOutlined className="text-3xl text-gray-500" />
              </div>
            ) : (
              <Image
                width={80}
                height={80}
                src={vendorProfile.profile_picture}
                alt="Profile Photo"
                className="rounded-full"
                onError={() => setError(true)}
              />
            )}
          </div>

          <div className="flex-1 ml-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-semibold">{vendorProfile.name}</h2>
              <Tag color={vendorProfile.is_active ? "green" : "red"}>
                {vendorProfile.is_active ? "Active" : "Inactive"}
              </Tag>
            </div>
            <div className="flex items-center mt-1">
              <Rate allowHalf defaultValue={4.5} disabled className="mr-2" />
              <h2 className="font-bold text-amber-700 text-2xl">4.5/5</h2>
            </div>
            <div className="flex gap-2 mt-2">
              {/* <Button icon={<EditOutlined />} size="small" onClick={handleEditProfile}>
                Edit Profile
              </Button> */}
              <UpdateProfile vendorProfile={vendorProfile} />
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
              >
                {vendorProfile.verify_status || "Verified"}
              </Button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Email:</strong> {vendorProfile.email}
            </p>
            <p>
              <strong>Phone:</strong> {vendorProfile.phone}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {vendorProfile.emergency_phone}
            </p>
            <p>
              <strong>About:</strong> {vendorProfile.about}
            </p>
          </div>
        </div>

        {/* Professional & Business Information */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">
            Professional & Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Company Name:</strong> {vendorProfile.company_name}
            </p>
            <p>
              <strong>Business License:</strong>{" "}
              {vendorProfile.business_license}
            </p>
          </div>
        </div>

        {/* NID & Documents Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">Identification & Documents</h3>
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
      </Card>
    </div>
  );
};

export default UserProfile;
