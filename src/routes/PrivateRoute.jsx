import { Navigate, useLocation } from "react-router-dom";
import { useVendorProfile } from "../api/api";
import { Spin } from "antd";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { vendorProfile, isLoading } = useVendorProfile();

  if (isLoading) {
    return <Spin />;
  }

  if (!vendorProfile.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
