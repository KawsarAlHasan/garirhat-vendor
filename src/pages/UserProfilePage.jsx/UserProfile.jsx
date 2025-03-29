import { Card, Rate, Tag, Avatar, Spin } from "antd";
import {
  CheckCircleOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useMyProfile, useVendorProfile } from "../../api/api";
import UpdateProfile from "./UpdateProfile";
import NidCardVerify from "./NidCardVerify";

const UserProfile = () => {
  const { vendorProfile } = useVendorProfile();
  const { myProfile, isLoading, isError, error, refetch } = useMyProfile();

  if (isLoading) {
    return <Spin />;
  }

  console.log("myProfile", myProfile);

  return (
    <div>
      <div className="flex justify-center items-center font-MyStyle">
        <Card className="w-full max-w-6xl border-none">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start p-4">
            {/* Profile Picture */}

            <div className="flex items-center">
              <Avatar
                className="w-[80px] h-[80px]"
                icon={!myProfile.profile_picture ? <UserOutlined /> : null}
                src={myProfile.profile_picture || undefined}
              />
            </div>

            <div className="flex-1 ml-4">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold">{myProfile.name}</h2>
                <Tag color={myProfile.is_active ? "green" : "red"}>
                  {myProfile.is_active ? "Active" : "Inactive"}
                </Tag>
              </div>
              <div className="flex items-center mt-1">
                <Rate allowHalf defaultValue={4.5} disabled className="mr-2" />
                <h2 className="font-bold text-amber-700 text-2xl">4.5/5</h2>
              </div>
              <div className="flex gap-2 mt-2">
                <UpdateProfile vendorProfile={myProfile} refetch={refetch} />
                <Tag
                  color={
                    myProfile.verify_status == "Verified" ? "green" : "red"
                  }
                  icon={
                    myProfile.verify_status == "Verified" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                >
                  {myProfile.verify_status}
                </Tag>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <p>
                <strong>Email:</strong> {myProfile.email}
              </p>
              <p>
                <strong>Phone:</strong> {myProfile.phone}
              </p>
              <p>
                <strong>Emergency Contact:</strong> {myProfile.emergency_phone}
              </p>
              <p>
                <strong>About:</strong> {myProfile.about}
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
                <strong>Company Name:</strong> {myProfile.company_name}
              </p>
              <p>
                <strong>Business License:</strong> {myProfile.business_lisence}
              </p>
            </div>
          </div>

          {/* NID & Documents Section */}
          <NidCardVerify vendorProfile={myProfile} refetch={refetch} />
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
