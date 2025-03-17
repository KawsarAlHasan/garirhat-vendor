import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SidebarForMessages from "./SidebarForMessages";
import MessageBox from "./MessageBox";

function Messages() {
  const { vendorID } = useParams();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 h-[75vh]">
        <div className="">
          <SidebarForMessages vendorID={vendorID} />
        </div>
        <div className="col-span-2">
          <MessageBox vendorID={vendorID} />
        </div>
      </div>
    </div>
  );
}

export default Messages;
