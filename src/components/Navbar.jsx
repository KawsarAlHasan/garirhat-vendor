import { Avatar } from "antd";
import Logo from "../assets/logobygarirhat.png";
import { UserOutlined } from "@ant-design/icons";
const Navbar = () => {
  return (
    <header className="text-gray-600 body-font w-full">
      <div className="container flex justify-between items-center px-5 mx-auto">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={Logo} width={200} alt="" />
        </a>
        <Avatar
          style={{
            backgroundColor: "#87d068",
          }}
          icon={<UserOutlined />}
        />
      </div>
    </header>
  );
};

export default Navbar;
