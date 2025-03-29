import React from "react";

function Practic() {
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
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Verified
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
                <strong>Phone:</strong> {myProfile.mobile_number}
              </p>
              <p>
                <strong>Blood Type:</strong> {myProfile.blood_type}
              </p>
              <p>
                <strong>Job Type:</strong> {myProfile.job_type}
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <p>
                <strong>Permanent Address:</strong>{" "}
                {myProfile.permanent_address}
              </p>
              <p>
                <strong>Current Address:</strong> {myProfile.current_address}
              </p>
            </div>
          </div>

          {/* NID Card Section */}
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">
              National ID / Birth Certificate
            </h3>
            <img
              src={myProfile.nid_card_or_birth_certificate}
              alt="NID/Birth Certificate"
              className="w-[300px] h-auto rounded border"
            />
          </div>

          <NidCardVerify vendorProfile={myProfile} refetch={refetch} />
        </Card>
      </div>
    </div>
  );
}

export default Practic;
