import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Main from "../layout/Main";
import DashBoard from "../pages/homepage/DashBoard";
import AddMyCar from "../pages/addcar/AddMyCar";
import UserMessage from "../pages/usermessage/UserMessage";
import CarDetails from "../pages/myVehicles/singleVehicle/CarDetails";
import UserProfile from "../pages/UserProfilePage.jsx/UserProfile";
import Practic from "../Practic";
import MyVehicles from "../pages/myVehicles/MyVehicles";
import EditVehicle from "../pages/myVehicles/editVehicle/EditVehicle";
import Messages from "../pages/messages/Messages";
import PrivateRoute from "./PrivateRoute";
import EmployeeManagement from "../pages/employeeManagement/EmployeeManagement";
import EmployeeDetails from "../pages/employeeManagement/EmployeeDetails";
import AddNewEmployee from "../pages/employeeManagement/AddNewEmployee";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },

      {
        path: "/user-messages",
        element: <UserMessage />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },

      {
        path: "/my-vehicles",
        element: <MyVehicles />,
      },
      {
        path: "/my-vehicles/add-new-vehicle",
        element: <AddMyCar />,
      },
      {
        path: "/my-vehicles/:vehicleID",
        element: <CarDetails />,
      },
      {
        path: "/my-vehicles/:vehicleID/edit",
        element: <EditVehicle />,
      },
      {
        path: "/messages/:vendorID",
        element: <Messages />,
      },
      {
        path: "/employee-management",
        element: <EmployeeManagement />,
      },
      {
        path: "/employee-management/add-new-employee",
        element: <AddNewEmployee />,
      },
      {
        path: "/employee-management/:employeeID",
        element: <EmployeeDetails />,
      },
      {
        path: "/test",
        element: <Practic />,
      },
    ],
  },
]);
