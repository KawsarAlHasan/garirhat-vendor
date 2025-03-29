import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SidebarForMessages from "./SidebarForMessages";
import MessageBox from "./MessageBox";
import { useVendorProfile } from "../../api/api";

function Messages() {
  const { vendorProfile, isLoading } = useVendorProfile();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 h-[75vh]">
        <div className="">
          <SidebarForMessages vendorID={vendorProfile.busn_id} />
        </div>
        <div className="col-span-2">
          <MessageBox vendorID={vendorProfile.busn_id} />
        </div>
      </div>
    </div>
  );
}

export default Messages;
