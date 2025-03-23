import { Card, Rate, Tag, Avatar, Spin } from "antd";
import {
  CheckCircleOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useVendorProfile } from "../../api/api";
import UpdateProfile from "./UpdateProfile";
import NidCardVerify from "./NidCardVerify";

const UserProfile = () => {
  const { vendorProfile, isLoading, refetch } = useVendorProfile();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="flex justify-center items-center font-MyStyle">
      <Card className="w-full max-w-6xl border-none">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start p-4">
          {/* Profile Picture */}

          <div className="flex items-center">
            <Avatar
              className="w-[80px] h-[80px]"
              icon={!vendorProfile.profile_picture ? <UserOutlined /> : null}
              src={vendorProfile.profile_picture || undefined}
            />
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
              <UpdateProfile vendorProfile={vendorProfile} refetch={refetch} />
              <Tag
                color={
                  vendorProfile.verify_status == "Verified" ? "green" : "red"
                }
                icon={
                  vendorProfile.verify_status == "Verified" ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
              >
                {vendorProfile.verify_status}
              </Tag>
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
              {vendorProfile.business_lisence}
            </p>
          </div>
        </div>

        {/* NID & Documents Section */}
        <NidCardVerify vendorProfile={vendorProfile} refetch={refetch} />
      </Card>
    </div>
  );
};

export default UserProfile;
