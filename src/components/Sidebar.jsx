import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CarOutlined,
  MessageOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { signOutVendor, useVendorProfile } from "../api/api";

const Sidebar = ({ onClick }) => {
  const { vendorProfile, isLoading } = useVendorProfile();

  const handleSignOut = () => {
    signOutVendor();
  };

  const sidebarItems = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },

    {
      key: "3",
      icon: <CarOutlined />,
      label: <Link to="/my-vehicles">My Vehicles</Link>,
    },
    {
      key: "4",
      icon: <MessageOutlined />,
      label: (
        <div>
          {isLoading ? (
            "Massages.."
          ) : (
            <Link to={`/messages/${vendorProfile?.id}`}>Massages</Link>
          )}
        </div>
      ),
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: <Link to="/user-profile">My Profile</Link>,
    },
    {
      key: "6",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/employee-management">Employee Management</Link>,
    },
    {
      key: "7",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/employee-management">Employee Management</Link>,
    },
    {
      key: "8",
      icon: <CiLogout />,
      label: <div onClick={handleSignOut}>Logout</div>,
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      // defaultOpenKeys={["4"]} // Automatically opens "Products"
      items={sidebarItems}
      onClick={onClick}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    />
  );
};

export default Sidebar;
